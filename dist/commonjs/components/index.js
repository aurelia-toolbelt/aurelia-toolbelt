Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('components/hello-world/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('components/bootstrap/index'));
}
exports.configure = configure;
