Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/latin/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/persian/index'));
}
exports.configure = configure;
