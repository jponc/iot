// https://www.dragino.com/downloads/downloads/LHT65/UserManual/LHT65_Temperature_Humidity_Sensor_UserManual_v1.3.pdf

function decodeUplink(input) {
  // create the object to collect the data for returning the decoded payload
  var data = {
    name: "Dragino Sensor",
    bytes: input.bytes, // original payload
    port: input.fPort, // lorawan port
    values: [],
  };

  var bytes = input.bytes;

  // battery
  var value = ((bytes[0] << 8) | bytes[1]) & 0x3fff;
  var batteryVoltage = value / 1000.0; //Battery,units:V

  data.values.push({
    type: "battery_voltage",
    value: batteryVoltage,
  });

  // temperature
  value = (bytes[2] << 8) | bytes[3];
  if (bytes[2] & 0x80) {
    value |= 0xffff0000;
  }
  var temperature = (value / 100).toFixed(2); //SHT20,temperature,units:℃

  data.values.push({
    type: "temperature",
    value: parseFloat(temperature),
  });

  // humidity
  value = (bytes[4] << 8) | bytes[5];
  var humidity = (value / 10).toFixed(1); //SHT20,Humidity,units:%

  data.values.push({
    type: "humidity",
    value: parseFloat(humidity),
  });

  // probe
  value = (bytes[7] << 8) | bytes[8];
  if (bytes[7] & 0x80) {
    value |= 0xffff0000;
  }
  var externalTemperature = (value / 100).toFixed(2); //DS18B20,temperature,units:℃

  data.values.push({
    type: "external_temperature",
    value: parseFloat(externalTemperature),
  });

  return {
    data: data,
    warnings: [],
    errors: [],
  };
}

module.exports = decodeUplink;
