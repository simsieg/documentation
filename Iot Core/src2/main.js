
const mydaco = require('mydaco');

exports.main = async function main(params) {
  const { lang = 'en' } = params.params;
  let title;
  let text;
  // retrieve all devices in account
  const devices = await getPowerDevices();
  if (lang === 'de') {
    title = 'Mein zweiter Geräte Service mit Stromgeräten';
    text = 'Das sind deine Geräte:';
  } else {
    title = 'My second device service with powerdevices';
    text = 'You have these devices:';
  }
  const html = text + JSON.stringify(devices);
  return { title, html };
}

//get all powerdevices in the user's account
async function getPowerDevices() {

  const data = await mydaco.interface('IotCore', 'powerDevices', {});

  const deviceInformation = data.devices.map(device => `${device.name} - ${device.friendlyName}`);
  return deviceInformation;
}
