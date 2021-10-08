package main

import (
	"log"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/jponc/iot/internal/authoriser"
)

func main() {
	config, err := NewConfig()
	if err != nil {
		log.Fatalf("cannot initialise config %v", err)
	}

	auth := authoriser.NewAuthoriser(config.Token)
	lambda.Start(auth.Authorise)
}
