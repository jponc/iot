const decodeUplink = require("./tabs-healthy-home-sensor");

test("parses paylaod properly", () => {
  const input = {
    bytes: [0, 0, 140, 7, 100, 144, 1, 0, 0, 254],
    fPort: 8,
  };

  expect(decodeUplink(input)).toEqual({
    data: {
      bytes: [0, 0, 140, 7, 100, 144, 1, 0, 0, 254],
      port: 8,
      values: [
        {
          type: "battery_voltage",
          value: 3.7,
        },
        {
          type: "temperature",
          value: -25,
        },
        {
          type: "humidity",
          value: 100,
        },
        {
          type: "co2",
          value: 256,
        },
        {
          type: "voc",
          value: 254,
        },
      ],
    },
    errors: [],
    warnings: [],
  });
});
