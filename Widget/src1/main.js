exports.main = function main(params) {
  console.log('widget service started');
  const { lang = 'en' } = params.params;

  if (params.inter === 'Widget') {
    let html, subTitle;
    if (lang === 'de') {
      subTitle = 'Mein erstes Widget';
      html = 'Hallo Welt! Das ist mein erstes Widget.';
    } else {
      subTitle = 'My first Widget';
      html = 'Hello World! This is my first Widget.';
    }

    return { html, subTitle };

  }

  if (params.inter === 'ServiceMarketplace') {
    let html, title;
    if (lang === 'de') {
      title = 'Mein erster Service';
      html = 'Hallo Welt! Nun wurde mein erstes Widget im Service Marketplace aktiviert.';
    } else {
      title = 'My first Service';
      html = 'Hello World! My first widget has been activated in the Service Marketplace right now.';
    }

    return { html, title };
  }
}
