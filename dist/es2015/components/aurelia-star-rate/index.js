define(["require", "exports", "aurelia-framework", "./elements/star-rate", "./elements/StarRateClicked"], function (require, exports, aurelia_framework_1, star_rate_1, StarRateClicked_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./elements/star-rate'));
    }
    exports.configure = configure;
    __export(star_rate_1);
    __export(StarRateClicked_1);
});
