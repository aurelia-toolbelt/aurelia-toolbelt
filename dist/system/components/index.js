System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/hello-world/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/index'))
            .feature(aurelia_framework_1.PLATFORM.moduleName('aurelia-toolbelt/components/aurelia-star-rate/index'));
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
