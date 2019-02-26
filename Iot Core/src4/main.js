
const mydaco = require('mydaco');

exports.main = async function main(params) {
  if (params.inter === 'ServiceMarketplace') {
    if (params.func === 'start') {
      return await first(params.params);
    }
    if (params.func === 'interact') {
      return await second(params.params);
    }
  }
  if (params.inter === 'IotCore') {
    buttonEvent(params.params);
  }
}

async function first(params) {
  const { lang = 'en' } = params;
  // retrieve all devices in account
  const devices = await getLampsAndButtons();
  if (lang === 'de') {
    title = 'Mein zweiter Geräte Service mit speziellen Geräten';
    text = 'Das sind deine Lampen:';
  } else {
    title = 'My second device service with featured devices';
    text = 'You have these lamps:';
  }
  let html = 'Lamps<br>';
  for (const lamp of devices.lamps) {
    html += `<input type="radio" name="lampId" value="${lamp.id}" required> ${lamp.name}<br>`;
  }
  html += 'Buttons<br>';
  for (const button of devices.buttons) {
    html += `<input type="radio" name="buttonId" value="${button.id}" required> ${button.name}<br>`;
  }
  html += `<input type="button" onclick="sendInputs()" value="OK" />`;
  return { title, html };
}

async function buttonEvent(params) {
  const value = Math.round(Math.random() * 256 * 256 * 256);
  const hexString = value.toString(16);
  const storage = await mydaco.interface('KeyValueStore', 'get', { key: 'lampId' });
  if (storage.key) {
    const deviceId = storage.value;
    const data = await mydaco.interface('IotCore', 'actuate', { deviceId, property: 'color', value: hexString });
  }
  return {};
}

async function second(params) {
  const { buttonId, lampId } = params.inputs;
  if (!buttonId || !lampId) {
    return { html: 'Please select a proper device.' }
  }
  const message = await deleteOldTasks();
  const data = await mydaco.interface('IotCore', 'createEvent', { event: 'click', deviceId: buttonId });
  const storageLamp = await mydaco.interface('KeyValueStore', 'put', { key: 'lampId', value: lampId });
  return { html: `The service is configured. Deleted ${message.length} old events.` };
}

//get all devices in the user's account
async function getLampsAndButtons() {
  const devices = await mydaco.interface('IotCore', 'featuredDevices', { type: [] });
  const lamps = devices.filter(device => device.type === 'LAMP');
  const buttons = devices.filter(device => device.type === 'BUTTON');
  return { lamps, buttons };
}

async function deleteOldTasks() {
  const events = await mydaco.interface('IotCore', 'listEvents', {});
  for (const event of events) {
    await mydaco.interface('IotCore', 'deleteEvent', { task: event.task });
  }
  return events;
}
