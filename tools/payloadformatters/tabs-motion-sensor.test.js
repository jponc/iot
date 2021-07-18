const decodeUplink = require("./tabs-motion-sensor");

test("parses paylaod properly", () => {
  const input = {
    bytes: [15, 32, 6, 32, 246, 2, 0, 136],
    fPort: 8,
  };

  expect(decodeUplink(input)).toEqual({
    data: {
      bytes: [15, 32, 6, 32, 246, 2, 0, 136],
      port: 8,
      values: [
        { type: "occupied", value: 1 },
        { type: "battery_percentage", value: 13.33 },
        { type: "internal_temperature", value: -26 },
      ],
    },
    errors: [],
    warnings: [],
  });
});
