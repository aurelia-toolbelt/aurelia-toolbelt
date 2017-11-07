Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config
        .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/binding-behaviours/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/services/index'))
        .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/value-converters/index'));
}
exports.configure = configure;
