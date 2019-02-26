
//import interfaces in mydaco
const mydaco = require('mydaco');

exports.main = async function main(params) {

  // retrieve language form parameters
  const { lang = 'en' } = params.params;
  let title;
  let html;

  const number = await getNumber();

  //Choose title and body (html) based on the language of the user.
  if (lang === 'de') {
    title = 'Mein Key Value Service';
    html = `Hallo Welt! Immer wenn ich diesen Service aufrufe, erhöht sich die Zahl um 1: ${number}`;
  } else {
    title = 'My Key Value Service';
    html = `Hello World! Everytime I call this service, the number is incremeted by 1: ${number}`;
  }

  await setNumber(number + 1);

  return { html, title };
}

async function getNumber() {
  const parameters = {
    key: 'mynumber'
  }
  try {
    const result = await mydaco.interface('KeyValueStore', 'get', parameters);
    if (typeof result.value === 'number') {
      return result.value;
    }
  } catch (error) { }
  return 0;
}

async function setNumber(number) {
  const parameters = {
    key: 'mynumber',
    value: number
  }
  return await mydaco.interface('KeyValueStore', 'put', parameters);
}
