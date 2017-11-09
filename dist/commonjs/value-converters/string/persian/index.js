Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./stringifyfa'));
}
exports.configure = configure;
