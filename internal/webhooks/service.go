package webhooks

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/events"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/influxdata/influxdb-client-go/v2/api/write"
	"github.com/jponc/iot/internal/apischema"
	"github.com/jponc/iot/pkg/lambdaresponses"
	"github.com/jponc/iot/pkg/ttn"
	log "github.com/sirupsen/logrus"
)

type Writer interface {
	WritePoint(ctx context.Context, point ...*write.Point) error
}

type Service struct {
	writer Writer
}

func NewService(writer Writer) *Service {
	return &Service{
		writer: writer,
	}
}

func (s *Service) TheThingsNetworkWebhook(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Infof("Payload: %v", request.Body)

	uplinkWebhook := ttn.UplinkWebhook{}
	err := json.Unmarshal([]byte(request.Body), &uplinkWebhook)
	if err != nil {
		log.Errorf("failed to parse")
		return lambdaresponses.Respond400(fmt.Errorf("failed to parse"))
	}

	name := uplinkWebhook.UplinkMessage.DecodedPayload.Name

	curTime := time.Now()

	for _, value := range uplinkWebhook.UplinkMessage.DecodedPayload.Values {
		p := influxdb2.NewPoint("reading",
			map[string]string{
				"sensor_name":  name,
				"reading_type": value.Type,
			},
			map[string]interface{}{
				"value": value.Value,
			},
			curTime,
		)

		log.Infof("Added")
		s.writer.WritePoint(ctx, p)
	}

	res := apischema.TheThingsNetworkWebhookResponse{Message: "OK"}

	return lambdaresponses.Respond200(res)
}
