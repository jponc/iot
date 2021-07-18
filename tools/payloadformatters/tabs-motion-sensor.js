// https://miromico.ch/wp-content/uploads/2019/03/Tabs_MotionSensor_11-DEC-2017.pdf

function decodeUplink(input) {
  function toBits(inputByte) {
    return ("00000000"+inputByte.toString(2)).slice(-8);
  }


  // create the object to collect the data for returning the decoded payload
  var data = {
    bytes: input.bytes, // original payload
    port: input.fPort, // lorawan port
    values: [],
  };

  var statusByte = input.bytes[0];
  var batteryByte = input.bytes[1];
  var tempByte = input.bytes[2];

  // status
  var statusBits = toBits(statusByte);
  var occupied = parseInt(statusBits[7]);

  data.values.push({
    type: 'occupied',
    value: occupied
  });


  // battery
  let batteryVoltage = battery = input.bytes[1] & 0x0f;
  batteryVoltage = (25 + battery) / 10;

  data.values.push({
    type: 'battery_voltage',
    value: batteryVoltage,
  });


  // internal temperature
  var tempBits = toBits(tempByte);
  var internal = parseInt(tempBits.slice(1, 8), 2) - 32

  data.values.push({
    type: 'internal_temperature',
    value: internal,
  });

  return {
    data: data,
    warnings: [],
    errors: [],
  };
}

module.exports = decodeUplink;
