

exports.fillTemplate = function (values) {
    let html = `
    <br>
    <p>${values.text}</p>`;
    values.devices.forEach((device) => {
        html += `<p>${device}</p>`;
    });

    return html;
}
