package ttn

type PayloadValue struct {
	Type  string  `json:"type"`
	Value float32 `json:"value"`
}

type Payload struct {
	Name   string         `json:"name"`
	Values []PayloadValue `json:"values"`
}

type UplinkMessage struct {
	DecodedPayload Payload `json:"decoded_payload"`
}

type UplinkWebhook struct {
	UplinkMessage UplinkMessage `json:"uplink_message"`
}
