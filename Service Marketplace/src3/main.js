// require template from a different file
const { fillTemplate } = require('./Template.js');

exports.main = function main(call) {
  // call.func contains the function of the interface
  // which triggered this execution
  if (call.func === 'start') {
    return handleInit(call.params);
  }
  return handleIframeClose(call.params);
}

async function handleInit(params) {
  const { lang = 'en' } = params;

  let title;
  let text;
  let devices;

  if (lang === 'de') {
    title = 'Mein erster Service (v3)';
    text = 'Hallo Welt! Wähle dein Lieblingsgerät:';
    devices = ['Geschirrspüler', 'Kühlschrank', 'Waschmaschine'];
  } else {
    title = 'My first Service (v3)';
    text = 'Hello World! Choose your favorite device:';
    devices = ['Dishwasher', 'Fridge', 'Washingmachine'];
  }
  const html = fillTemplate({ text, devices });

  // log the html just out of curiosity
  console.log(html);

  return { html, title };
}

async function handleIframeClose(params) {
  // the previous inputs are collected in the "inputs" object
  const { inputs: { device }, lang } = params;

  if (lang === 'de') {
    title = 'Dein Lieblingsgerät';
    html = `Dein Lieblingsgerät ist: ${device}`;
    html += `<br><input type="button" onclick="closeWindow()" value="Schließen" />`;
  } else {
    title = 'Your favorite device';
    html = `Your favorite device is: ${device}`;
    html += `<br><input type="button" onclick="closeWindow()" value="Close" />`;
  }
  return { html, title };
}
