// the source code for the d3.js example
// is placed in a seperate file graph.js
const { graph } = require('./graph.js');

exports.main = function main(call) {
  console.log('widget service started');
  const { params: { lang = 'en' } } = call;

  if (call.inter === 'Widget') {
    let subTitle;

    if (lang === 'de') {
      subTitle = 'Mein drittes Widget';
    } else {
      subTitle = 'My third Widget';
    }

    // just display the graph example
    const html = graph();

    return { html, subTitle };

  }

  if (call.inter === 'ServiceMarketplace') {
    let html, title;
    if (lang === 'de') {
      title = 'Mein drittes Widget';
      html = 'Hallo Welt! Nun wurde mein drittes Widget im Service Marketplace aktiviert.';
    } else {
      title = 'My third Widget';
      html = 'Hello World! My third widget has been activated in the Service Marketplace right now.';
    }

    return { html, title };
  }
}
