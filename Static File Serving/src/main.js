
exports.main = function(call) {
    const html = `
    <h1>This image is served without executing the action.<h1>
    <img src="static/mydaco.png" style="width: 100%"/>
    `; 
    return { html };
}