define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./stringifyfa'));
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./stringifyrial'));
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./stringifytoman'));
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./rial'));
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./toman'));
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./persianchars'));
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./persiankeyboard'));
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./persianurl'));
    }
    exports.configure = configure;
});
