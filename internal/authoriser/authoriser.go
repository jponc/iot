package authoriser

import (
	"context"
	"fmt"
	"strings"

	"github.com/aws/aws-lambda-go/events"
)

type Authoriser struct {
	token string
}

// NewService instantiates a new service
func NewAuthoriser(token string) *Authoriser {
	return &Authoriser{
		token: token,
	}
}

func (a *Authoriser) Authorise(ctx context.Context, request events.APIGatewayCustomAuthorizerRequest) (events.APIGatewayCustomAuthorizerResponse, error) {
	authToken := request.AuthorizationToken
	accessToken := strings.Split(authToken, " ")[1]

	if accessToken != a.token {
		return events.APIGatewayCustomAuthorizerResponse{}, fmt.Errorf("Unauthorized")
	}

	context := map[string]interface{}{}

	return generatePolicy("user", "Allow", request.MethodArn, context), nil
}

func generatePolicy(principalID, effect string, resource string, context map[string]interface{}) events.APIGatewayCustomAuthorizerResponse {
	authResponse := events.APIGatewayCustomAuthorizerResponse{PrincipalID: principalID}

	if effect != "" && resource != "" {
		authResponse.PolicyDocument = events.APIGatewayCustomAuthorizerPolicy{
			Version: "2012-10-17",
			Statement: []events.IAMPolicyStatement{
				{
					Action:   []string{"execute-api:Invoke"},
					Effect:   effect,
					Resource: []string{resource},
				},
			},
		}
	}

	authResponse.Context = context
	return authResponse
}
