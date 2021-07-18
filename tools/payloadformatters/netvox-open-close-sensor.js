// https://docs.microshare.io/assets/pdf/TBHV100.pdf

function decodeUplink(input) {
  function toBits(inputByte) {
    return ("00000000" + inputByte.toString(2)).slice(-8);
  }

  // create the object to collect the data for returning the decoded payload
  var data = {
    bytes: input.bytes, // original payload
    port: input.fPort, // lorawan port
    values: [],
  };

  // battery
  let batteryVoltage = input.bytes[3] / 10

  data.values.push({
    type: "battery_voltage",
    value: batteryVoltage,
  });

  // open_close
  let openClose = parseInt(input.bytes[4])

  data.values.push({
    type: "open_close",
    value: openClose,
  });

  return {
    data: data,
    warnings: [],
    errors: [],
  };
}

module.exports = decodeUplink;
