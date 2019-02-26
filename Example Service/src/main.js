const { translations } = require('./translations');

const { initWidget } = require('./iframes/initWidget');

const { finishWidget } = require('./iframes/finishWidget');

const mydaco = require('mydaco');

async function main(params) {
    console.log('started');
    try {
        console.log(params);

        if (params.inter === 'Widget') {
            const { lang = 'en' } = params.params;
            return await getWidget(lang);
        }

        if (params.inter === 'ServiceMarketplace') {
            const { lang = 'en' } = params.params;
            const t = translations[lang];

            // save language for late
            await mydaco.interface('KeyValueStore', 'put', { key: 'lang', value: lang });

            // go to things like settings and so on
            return await handleInteraction(params.params, t);
        }

    } catch (error) {
        console.log('main error');
        console.log(error);
        return { html: 'An undefined error occured.' };
    }
}

// handle the interaction on the iframe
async function handleInteraction(params, t) {
    console.log('iframe interaction');
    console.log(params);
    // widget setup done
    if (params.inputs) {
        // handle Nothing selected
        if (!params.inputs.selectedDevice || params.inputs.selectedDevice === "") {
            console.log("no device selected");
            return await handleWidgetInit(t, "noDevices");
        }
        // widget setup done
     
        return finishWidgetInit(t, params);

    }
    return await handleWidgetInit(t);
}

async function finishWidgetInit(t, params) {
    console.log('iframe for finish widget');
    console.log(params);
    const value = {
        device: params.inputs.selectedDevice,
    };
    await mydaco.interface('KeyValueStore', 'put', { key: 'widgetSettings', value });

    const html = finishWidget(t);
    return { html, title: t.title };
}

// iframe to select devices, fixed time span of 1 week for the moment
async function handleWidgetInit(t, error = "") {
    // get devices
    const devices = await getPowerDevices();
    // not checked for existence, should only be here, if devices exist

    // error can occur from no device selected
    const html = initWidget(t, devices, error);
    return { html, title: t.title };
}



async function getPowerDevices() {
    const devs = await mydaco.interface('IotCore', 'powerDevices', {});
    console.log(devs);
    const devices = devs.devices;
    const deviceInformation = devices.map(device => ({
        displayName: device.friendlyName ? device.friendlyName : device.readableName,
        id: device.id,
    })
    );
    return deviceInformation;
}

/////////////////////////////////
//////// WIDGET
/////////////////////////////////


async function getWidget(lang) {
    const settings = await mydaco.interface('KeyValueStore', 'get', { key: 'widgetSettings' });
    const start = Math.floor(new Date().getTime() / 86400000) * 86400000;
    // end date needs to have 1 day added, to bascially calculate till 23:59
    const end = start + 86400000 - 1000;

    const parameters = {
        id: 'test',//settings.value.device,
        start,
        end,
        grouping: 'minute',
        aggregate: 'mean'
    };

    const data = await mydaco.interface('IotCore', 'powerData', parameters);

    const events = [];
    let lastEvent = '';
    const THRESHOLD = 10;
    for (const point of data.series) {
        if (point[1] > THRESHOLD && lastEvent !== 'ON') {
            lastEvent = 'ON';
            events.push({ time: point[0], event: lastEvent });
        } else if (point[1] <= THRESHOLD && lastEvent !== 'OFF') {
            lastEvent = 'OFF';
            events.push({ time: point[0], event: lastEvent });
        }
    }
    let html = 'Power : ';
    for (const event of events) {
        const date = new Date(event.time);
        html += '<br>' + niceTime(date) + ' - ' + event.event;
    }

    return { html };
}

function niceTime(date) {
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return hours + ':' + minutes;
}

async function setWidget(benchmark) {
    console.log('set benchmark ', benchmark)
    // only save the benchmark, display stuff will be done later on
    await mydaco.interface('KeyValueStore', 'put', { key: 'benchmark', value: benchmark });
    return { success: true };
}


module.exports = {
    main,
};
