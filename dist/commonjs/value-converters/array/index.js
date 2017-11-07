Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./order-by'),
        aurelia_framework_1.PLATFORM.moduleName('./group-by'),
        aurelia_framework_1.PLATFORM.moduleName('./filter-by')
    ]);
}
exports.configure = configure;
