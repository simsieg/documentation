
const mydaco = require('mydaco');
const { fillTemplate } = require('./Template.js');

exports.main = async function main(params) {
  const { lang = 'en' } = params.params;
  let title;
  let text;
  // retrieve all devices in account
  const devices = await getMyDevices();
  if (lang === 'de') {
    title = 'Mein erster Geräte Service';
    text = 'Das sind deine Geräte:';
  } else {
    title = 'My first Device Service';
    text = 'You have these devices:';
  }
  const html = fillTemplate({ text, devices });
  return {
    html, title
  };
}

//get all devices in the user's account
async function getMyDevices() {
  //First retrieve providers
  const providerRAW = await mydaco.interface('IotCore', 'provider', {});
  if (providerRAW.length === 0)
    return [];
  const providers = providerRAW.map(p => p.provider);
  //Second retrieve devices based on the provider list
  const devices = await mydaco.interface('IotCore', 'devices', { providers });
  const deviceInformation = devices.map(device => `${device.provider} - ${device.name}`);
  return deviceInformation;
}
