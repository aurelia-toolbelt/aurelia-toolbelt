function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./hello-world"));
function configure(config) {
    config.globalResources('./hello-world');
}
exports.configure = configure;
