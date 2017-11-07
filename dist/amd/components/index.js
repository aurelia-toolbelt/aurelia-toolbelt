define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/hello-world/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/aurelia-star-rate/index'));
    }
    exports.configure = configure;
});
