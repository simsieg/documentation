// the main function will be called
exports.main = function main(call) {

  // retrieve language from parameters
  const { params: { lang = 'en' } } = call;

  let title;
  let html;

  //Choose title and body (html) based on the language of the user.
  if (lang === 'de') {
    title = 'Mein erster Service';
    html = 'Hallo Welt! Das ist mein erster Service für den Service Marketplace.';
  } else {
    title = 'My first Service';
    html = 'Hello World! This is my first Service for the Service Marketplace.';
  }

  // we return html and title since this is needed for the ServiceMarketplace interface
  return { html, title };
}
