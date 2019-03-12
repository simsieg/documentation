
exports.fillTemplate = function (values) {
    let html = `
    <br>
    <p>${values.text}</p>`;
    values.properties.forEach((prop) => {
        html += `<p>${prop}</p>`;
    });

    html += `<br><input type="button" onclick="closeWindow()" value="${values.closeLabel}" />`;

    return html;
}
