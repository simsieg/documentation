
const { fillTemplate } = require('./Template.js');

exports.main = function main(params) {
  if (params.func === 'start') {
    return handleInit(params);
  }
  return handleIframeClose(params);
}

async function handleInit(params) {
  const { lang = 'en' } = params.params;
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
  const html = fillTemplate({ text, devices }); console.log(html);
  return {
    html, title
  };
}

async function handleIframeClose(params) {
  const { inputs, lang } = params.params;
  const { device } = inputs;
  if (lang === 'de') {
    title = 'Dein Lieblingsgerät';
    html = `Dein Lieblingsgerät ist: ${device}`;
  } else {
    title = 'Your favorite device';
    html = `Your favorite device is: ${device}`;
  }
  return { html, title };
}
