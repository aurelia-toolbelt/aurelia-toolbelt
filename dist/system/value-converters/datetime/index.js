System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./moment-vc'),
            aurelia_framework_1.PLATFORM.moduleName('./moment-timezone-vc'),
            aurelia_framework_1.PLATFORM.moduleName('./humanize-duration-vc')
        ]);
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
