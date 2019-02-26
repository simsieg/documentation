
//import interfaces in mydaco
const mydaco = require('mydaco');
const { mailDE, mailEN } = require('./mailTemplates');

exports.main = async function (params) {
    // retrieve language form parameters
    const { lang = 'en' } = params.params;
    let title;
    let html;

    if (lang === 'de') {
        title = 'Mein Mail Service';
        try {
            const subject = 'Meine erste Mail';
            const text = 'Das ist meine erste Mail mit Conrad Connect. Sie ist als Text geschrieben';
            //send Mail in German
            await sendMail(subject, text, mailDE);
            html = 'Hallo Welt! Das ist mein Mail Service. Ich habe dir gerade eine Mail geschickt.';
        } catch (error) {
            html = 'Hallo Welt! Das ist mein Mail Service. Leider ging etwas schief.';
        }
    } else {
        title = 'My Mail Service';
        try {
            const subject = 'My first Mail';
            const text = 'This is my first mail with Conrad Connect. It is written as text';
            //send Mail in English
            await sendMail(subject, text, mailEN);
            html = 'Hello World! This is my mail service. I have just send you a mail';
        } catch (error) {
            html = 'Hello World! This is my mail service. Unfortunately, something went wrong.';
        }
    }
    return { html, title };
}

function sendMail(subject, text, html) {
    const parameters = { subject, text, html };
    // send a mail using the mydaco inteface 'Mail'
    return mydaco.interface('Mail', 'sendMail', parameters);
}
