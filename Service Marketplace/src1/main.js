exports.main = function main(params) {

  // retrieve language form parameters
  const { lang = 'en' } = params.params;
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

  return { html, title };
}
