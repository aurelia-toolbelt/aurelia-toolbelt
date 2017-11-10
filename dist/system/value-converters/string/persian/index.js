System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    var aurelia_framework_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
        }
    };
});
