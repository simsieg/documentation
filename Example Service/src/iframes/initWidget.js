function initWidget(t, devices, displayError = "") {
  let html = `
<br>
<p>${t.deviceSelection.title}</p>
<div>
    ${t.deviceSelection.text}
</div>
<div>
	${displayError === "noDevice" ? t.deviceSelection.error : ''}
</div>
<div>
	<input type="hidden" name="widgetDevices" value="true">
  `;
  devices.forEach((dev) => {
    html += `<input type="radio" name="selectedDevice" value="${dev.id}" required> ${dev.displayName}<br>`;
  });
html += `
  <input type="button" class="send" value="${t.deviceSelection.buttonLabel}" />
</div>
`;

  return html;
}


module.exports = {
  initWidget
};
