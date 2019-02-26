
// Call with {"name": "World"}
exports.main = function (params) {
    const message = `Hello ${params.params.name}!`;
    return { message };
}
