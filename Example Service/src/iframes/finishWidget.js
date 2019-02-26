function finishWidget(t) {
  let html = `
<br>
<p>${t.widgetFinished.title}</p>
<div>
    ${t.widgetFinished.text}<br>
    <input type="button" onclick="closeWindow()" value="${t.widgetFinished.buttonLabel}" />
</div>
`;
	return html;
}

module.exports = {
  finishWidget
};
