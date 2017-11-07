Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('binding-behaviours/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('components/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('custom-attributes/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('services/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('value-converters/index'));
}
exports.configure = configure;
