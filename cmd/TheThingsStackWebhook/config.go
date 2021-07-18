package main

import (
	"fmt"
	"os"
)

// Config
type Config struct {
}

// NewConfig initialises a new config
func NewConfig() (*Config, error) {
	return &Config{}, nil
}

func getEnv(key string) (string, error) {
	v := os.Getenv(key)

	if v == "" {
		return "", fmt.Errorf("%s environment variable missing", key)
	}

	return v, nil
}
