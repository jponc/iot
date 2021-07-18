package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jponc/iot/internal/webhooks"
)

func main() {
	service := webhooks.NewService()
	lambda.Start(service.TheThingsNetworkWebhook)
}
