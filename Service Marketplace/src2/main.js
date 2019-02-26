const { fillTemplate } = require('./Template.js');

exports.main = function main(params) {
  const { lang = 'en' } = params.params;
  let title;
  let text;
  let properties;
  if (lang === 'de') {
    title = 'Mein erster Service (v2)';
    text = 'Hallo Welt! Hier habe ich eine Schleife genutzt';
    properties = ['Ich', 'bin', 'ein', 'Entwickler'];
  } else {
    title = 'My first Service (v2)';
    text = 'Hello World! Here I used a loop.';
    properties = ['I', 'am', 'a', 'developer'];
  }
  const templateValues = { text, properties };
  const html = fillTemplate(templateValues);
  return {
    html, title
  };
}
