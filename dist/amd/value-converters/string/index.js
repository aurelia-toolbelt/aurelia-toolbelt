define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/latin/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/value-converters/string/persian/index'));
    }
    exports.configure = configure;
});
