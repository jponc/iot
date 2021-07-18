const decodeUplink = require("./tabs-motion-sensor");

test("parses paylaod properly", () => {
  const input = {
    bytes: [15, 32, 6, 32, 246, 2, 0, 136],
    fPort: 8,
  };

  expect(decodeUplink(input)).toEqual({
    data: {
      name: "Motion Sensor",
      bytes: [15, 32, 6, 32, 246, 2, 0, 136],
      port: 8,
      values: [
        { type: "occupied", value: 1 },
        { type: "battery_voltage", value: 2.5 },
        { type: "temperature", value: -26 },
      ],
    },
    errors: [],
    warnings: [],
  });
});
