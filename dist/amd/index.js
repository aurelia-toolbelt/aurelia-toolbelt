define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        console.log('');
        config
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/binding-behaviours/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/custom-attributes/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/services/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/value-converters/index'));
    }
    exports.configure = configure;
});
