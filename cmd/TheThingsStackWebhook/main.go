package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/jponc/iot/internal/webhooks"

	log "github.com/sirupsen/logrus"
)

func main() {
	config, err := NewConfig()
	if err != nil {
		log.Fatalf("cannot initialise config %v", err)
	}

	influxClient := influxdb2.NewClient(config.InfluxHost, config.InfluxToken)
	writer := influxClient.WriteAPIBlocking(config.InfluxOrg, config.InfluxBucket)

	service := webhooks.NewService(writer)
	lambda.Start(service.TheThingsNetworkWebhook)
}
