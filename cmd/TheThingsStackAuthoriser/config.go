package main

import (
	"fmt"
	"os"
)

// Config
type Config struct {
	Token string
}

// NewConfig initialises a new config
func NewConfig() (*Config, error) {
	token, err := getEnv("TOKEN")
	if err != nil {
		return nil, err
	}

	return &Config{
		Token: token,
	}, nil
}

func getEnv(key string) (string, error) {
	v := os.Getenv(key)

	if v == "" {
		return "", fmt.Errorf("%s environment variable missing", key)
	}

	return v, nil
}
