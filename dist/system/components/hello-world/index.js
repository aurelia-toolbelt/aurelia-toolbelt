System.register(["aurelia-framework", "./hello-world"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./hello-world'));
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    var exportedNames_1 = {
        "configure": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (hello_world_1_1) {
                exportStar_1(hello_world_1_1);
            }
        ],
        execute: function () {
        }
    };
});
