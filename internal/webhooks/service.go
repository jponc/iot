package webhooks

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/jponc/iot/internal/apischema"
	"github.com/jponc/iot/pkg/lambdaresponses"
	log "github.com/sirupsen/logrus"
)

type Service struct {
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) TheThingsNetworkWebhook(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Infof("Payload: %v", request.Body)

	res := apischema.TheThingsNetworkWebhookResponse{Message: "OK"}

	return lambdaresponses.Respond200(res)
}
