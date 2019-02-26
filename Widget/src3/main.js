const { graph } = require('./graph.js');

exports.main = function main(params) {
  console.log('widget service started');
  const { lang = 'en' } = params.params;

  if (params.inter === 'Widget') {
    let subTitle;

    if (lang === 'de') {
      subTitle = 'Mein drittes Widget';
    } else {
      subTitle = 'My third Widget';
    }

    const html = graph();

    return { html, subTitle };

  }

  if (params.inter === 'ServiceMarketplace') {
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
