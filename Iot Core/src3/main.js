
const mydaco = require('mydaco');

exports.main = async function main(params) {
  const { lang = 'en' } = params.params;
  let title;
  let text;
  // retrieve all devices in account
  const devices = await getFeaturedDevices();
  if (lang === 'de') {
    title = 'Mein dritter Geräte Service mit speziellen Geräten';
    text = 'Das sind deine Geräte:';
  } else {
    title = 'My third device service with featured devices';
    text = 'You have these devices:';
  }
  const html = text + JSON.stringify(devices);
  return { title, html };
}

//get all devices in the user's account
async function getFeaturedDevices() {

  const devices = await mydaco.interface('IotCore', 'featuredDevices', { type: [] });

  const deviceInformation = devices.map(device => `${device.name} - ${device.type} - ${JSON.stringify(device.properties)} - ${JSON.stringify(device.events)}`);
  return deviceInformation;
}
