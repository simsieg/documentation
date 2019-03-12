// require template from a different file
const { fillTemplate } = require('./Template.js');

exports.main = function main(call) {

  const { params: { lang = 'en' } } = call;

  let title;
  let text;
  let properties;
  let closeLabel;

  if (lang === 'de') {
    title = 'Mein erster Service (v2)';
    text = 'Hallo Welt! Hier habe ich eine Schleife genutzt';
    properties = ['Ich', 'bin', 'ein', 'Entwickler'];
    closeLabel = 'Schließen';
  } else {
    title = 'My first Service (v2)';
    text = 'Hello World! Here I used a loop.';
    properties = ['I', 'am', 'a', 'developer'];
    closeLabel = 'Close';
  }

  const templateValues = { text, properties, closeLabel };

  // use our template fill helper to fill values into html.
  const html = fillTemplate(templateValues);

  return {
    html, title
  };
}
