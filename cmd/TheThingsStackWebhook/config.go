package main

import (
	"fmt"
	"os"
)

// Config
type Config struct {
	InfluxBucket string
	InfluxOrg    string
	InfluxToken  string
	InfluxHost   string
}

// NewConfig initialises a new config
func NewConfig() (*Config, error) {

	influxBucket, err := getEnv("INFLUX_BUCKET")
	if err != nil {
		return nil, err
	}

	influxHost, err := getEnv("INFLUX_HOST")
	if err != nil {
		return nil, err
	}

	influxOrg, err := getEnv("INFLUX_ORG")
	if err != nil {
		return nil, err
	}

	influxToken, err := getEnv("INFLUX_TOKEN")
	if err != nil {
		return nil, err
	}

	return &Config{
		InfluxBucket: influxBucket,
		InfluxOrg:    influxOrg,
		InfluxToken:  influxToken,
		InfluxHost:   influxHost,
	}, nil
}

func getEnv(key string) (string, error) {
	v := os.Getenv(key)

	if v == "" {
		return "", fmt.Errorf("%s environment variable missing", key)
	}

	return v, nil
}
