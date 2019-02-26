
//import intefaces in mydaco
const mydaco = require('mydaco');
const { mailEN } = require('./mailTemplates');

exports.main = async function (params) {
    if (params.inter === 'Cron') {
        return await handleCron();
    }
    return await handleInit(params);
}

async function handleInit(params) {
    const { lang = 'en' } = params.params;
    let title;
    let html;
    const cronPatterns = ['* * * * *'];
    if (lang === 'de') {
        title = 'Mein Cron Service';
        try {
            await setCron(cronPatterns);
            html = 'Hallo Welt! Das ist mein Cron Service. Du erhältst bald eine Mail per Cron Job.';
        } catch (error) {
            html = 'Hallo Welt! Das ist mein Cron Service. Leider ging etwas schief.';
        }
    } else {
        title = 'My Mail Service';
        try {
            await setCron(cronPatterns);
            html = 'Hello World! This is my cron service. You receive a mail schedeluded by a cron job soon';
        } catch (error) {
            html = 'Hello World! This is my cron service. Unfortunately, something went wrong.';
        }
    }
    return { html, title, lang };
}

async function handleCron() {
    const cronPatterns = [];
    await setCron(cronPatterns);
    const subject = 'Mail From Cron Service';
    const text = 'This is a mail form your Cron service.';
    await sendMail(subject, text, mailEN);
    return {};
}

function setCron(cronPatterns) {
    // send cron patterns. This service is automatically called based on them.
    return mydaco.interface('Cron', 'put', { cronPatterns });
}

function sendMail(subject, text, html) {
    const parameters = { subject, text, html };
    // send a mail using the mydaco inteface 'mail'
    return mydaco.interface('Mail', 'sendMail', parameters);
}
