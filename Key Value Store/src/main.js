
// import interfaces into the constant "mydaco"
const mydaco = require('mydaco');

exports.main = async function main(call) {

  // retrieve language form parameters
  const { params: { lang = 'en' } } = call;
  let title;
  let html;

  const number = await getNumber();

  //Choose title and body (html) based on the language of the user.
  if (lang === 'de') {
    title = 'Mein Key Value Service';
    html = `Hallo Welt! Immer wenn ich diesen Service aufrufe, erhöht sich die Zahl um 1: <b>${number}</b>`;
  } else {
    title = 'My Key Value Service';
    html = `Hello World! Everytime I call this service, the number is incremented by 1: <b>${number}</b>`;
  }

  await setNumber(number + 1);

  return { html, title };
}

// function to get the number from the KeyValueStore
async function getNumber() {
  const parameters = {
    key: 'mynumber'
  };
  try {
    const result = await mydaco.interface('KeyValueStore', 'get', parameters);
    if (typeof result.value === 'number') {
      // result.value hold the value saved to the KeyValueStore
      return result.value;
    }
    // ignore errors (e.g. first call)
  } catch (error) { }
  return 0;
}

// save the number using the key: mynumber
async function setNumber(number) {
  const parameters = {
    key: 'mynumber',
    value: number
  }
  return await mydaco.interface('KeyValueStore', 'put', parameters);
}
