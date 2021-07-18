const decodeUplink = require("./netvox-open-close-sensor");

test("open", () => {
  const input = {
    bytes: [1, 2, 1, 31, 1, 0, 0, 0, 0, 0, 0],
    fPort: 6,
  };

  expect(decodeUplink(input)).toEqual({
    data: {
      bytes: [1, 2, 1, 31, 1, 0, 0, 0, 0, 0, 0],
      port: 6,
      values: [
        {
          type: "battery_voltage",
          value: 3.1,
        },
        {
          type: "open_close",
          value: 1,
        },
      ],
    },
    errors: [],
    warnings: [],
  });
});

test("close", () => {
  const input = {
    bytes: [1, 2, 1, 31, 0, 0, 0, 0, 0, 0, 0],
    fPort: 6,
  };

  expect(decodeUplink(input)).toEqual({
    data: {
      bytes: [1, 2, 1, 31, 0, 0, 0, 0, 0, 0, 0],
      port: 6,
      values: [
        {
          type: "battery_voltage",
          value: 3.1,
        },
        {
          type: "open_close",
          value: 0,
        },
      ],
    },
    errors: [],
    warnings: [],
  });
});
