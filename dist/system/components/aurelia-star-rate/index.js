System.register(["aurelia-framework", "./elements/star-rate", "./elements/StarRateClicked"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./elements/star-rate'));
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
            function (star_rate_1_1) {
                exportStar_1(star_rate_1_1);
            },
            function (StarRateClicked_1_1) {
                exportStar_1(StarRateClicked_1_1);
            }
        ],
        execute: function () {
        }
    };
});
