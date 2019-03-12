
// Call with {"name": "World"}
exports.main = function (call) {
    const message = `Hello ${call.params.name}!`;
    return { message };
}
