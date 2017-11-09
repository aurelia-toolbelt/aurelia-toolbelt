define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./stringifyfa'));
    }
    exports.configure = configure;
});
