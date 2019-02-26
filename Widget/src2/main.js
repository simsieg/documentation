exports.main = function main(params) {
  console.log('widget service started');
  const { lang = 'en' } = params.params;

  if (params.inter === 'Widget') {
    let html, subTitle;

    if (params.func === 'start') {
      if (lang === 'de') {
        subTitle = 'Mein zweites Widget';
        html = 'Hallo Welt! Das ist mein zweites Widget.<br>';
        html += 'Bitte gibt deinen Namen ein:<br>';
        html += '<input type="text" name="name"/><br>';
        html += '<input type="button" onclick="sendInputs()" value="Los" />';
      } else {
        subTitle = 'My second Widget';
        html = 'Hello World! This is my second Widget.<br>';
        html += 'Please enter your name:<br>';
        html += '<input type="text" name="name"/><br>';
        html += '<input type="button" onclick="sendInputs()" value="Go" />';
      }
    } else {
      // params.func === 'interact'
      if (lang === 'de') {
        subTitle = 'Mein zweites Widget';
        html = `Sei gegrüßt, ${params.params.inputs.name}`;
      } else {
        subTitle = 'My second Widget';
        html = `Hello ${params.params.inputs.name}`;
      }
    }

    return { html, subTitle };

  }

  if (params.inter === 'ServiceMarketplace') {
    let html, title;
    if (lang === 'de') {
      title = 'Mein zweiter Widget';
      html = 'Hallo Welt! Nun wurde mein zweites Widget im Service Marketplace aktiviert.';
    } else {
      title = 'My second Widget';
      html = 'Hello World! My second widget has been activated in the Service Marketplace right now.';
    }

    return { html, title };
  }
}
