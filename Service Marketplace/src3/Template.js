
exports.fillTemplate = function (values) {
    let html = `<p>${values.text}</p>`;
    values.devices.forEach((device) => {
        html += `<input type="radio" name="device" value="${device}" required> ${device}<br>`;
    });
    html += `<input type="button" onclick="sendInputs()" value="OK" />`;
    return html;
}
