Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./moment-vc'),
        aurelia_framework_1.PLATFORM.moduleName('./moment-timezone-vc'),
        aurelia_framework_1.PLATFORM.moduleName('./humanize-duration-vc')
    ]);
}
exports.configure = configure;
