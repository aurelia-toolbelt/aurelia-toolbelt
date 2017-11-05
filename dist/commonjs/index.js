function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./hello-world"));
function configure(config) {
    config.globalResources("./hello-world");
}
exports.configure = configure;

//# sourceMappingURL=index.js.map
