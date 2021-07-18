// https://docs.microshare.io/assets/pdf/TBHV100.pdf

function decodeUplink(input) {
  function toBits(inputByte) {
    return ("00000000"+inputByte.toString(2)).slice(-8)
  }


  // create the object to collect the data for returning the decoded payload
  var data = {
    name: "Home Temp/Hum/AirQuality",
    bytes: input.bytes, // original payload
    port: input.fPort, // lorawan port
    values: [],
  };

  var tempByte = input.bytes[3];
  var humidityByte = input.bytes[4];
  var coByte1 = input.bytes[6];
  var coByte2 = input.bytes[7];
  var vocByte1 = input.bytes[8];
  var vocByte2 = input.bytes[9];

  // battery
  let batteryVoltage = battery = input.bytes[2] & 0x0f;
  batteryVoltage = (25 + battery) / 10;

  data.values.push({
    type: 'battery_voltage',
    value: batteryVoltage,
  });

  // temperature
  var tempBits = toBits(tempByte);
  var temperature = parseInt(tempBits.slice(1, 8), 2) - 32

  data.values.push({
    type: 'temperature',
    value: temperature,
  });

  // humidity
  var humidityBits = toBits(humidityByte);
  var humidityPercentage = parseInt(humidityBits.slice(1, 8), 2)

  data.values.push({
    type: 'humidity',
    value: humidityPercentage,
  });

  // co2
  var coBits = `${toBits(coByte1)}${toBits(coByte2)}`
  var co2 = parseInt(coBits, 2);

  data.values.push({
    type: 'co2',
    value: co2,
  });

  // voc
  var vocBits = toBits(vocByte1)+toBits(vocByte2)
  var voc = parseInt(vocBits, 2);

  data.values.push({
    type: 'voc',
    value: voc,
  });


  return {
    data: data,
    warnings: [],
    errors: [],
  };
}

module.exports = decodeUplink;
