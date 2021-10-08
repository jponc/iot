const decodeUplink = require("./dragino-lht65-sensor");

test("parses paylaod properly", () => {
  const input = {
    bytes: [203, 184, 8, 74, 2, 28, 1, 127, 255, 127, 255],
    fPort: 2,
  };

  expect(decodeUplink(input)).toEqual({
    data: {
      name: "Dragino Sensor",
      bytes: [203, 184, 8, 74, 2, 28, 1, 127, 255, 127, 255],
      port: 2,
      values: [
        {
          type: "battery_voltage",
          value: 3,
        },
        {
          type: "temperature",
          value: 21.22,
        },
        {
          type: "humidity",
          value: 54,
        },
        {
          type: "external_temperature",
          value: 327.67,
        },
      ],
    },
    errors: [],
    warnings: [],
  });
});
