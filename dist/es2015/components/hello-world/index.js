define(["require", "exports", "aurelia-framework", "./hello-world"], function (require, exports, aurelia_framework_1, hello_world_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(hello_world_1);
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./hello-world'));
    }
    exports.configure = configure;
});
