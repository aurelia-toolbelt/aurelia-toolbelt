define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config
            .feature(aurelia_framework_1.PLATFORM.moduleName('binding-behaviours/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('components/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('custom-attributes/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('services/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('value-converters/index'));
    }
    exports.configure = configure;
});
