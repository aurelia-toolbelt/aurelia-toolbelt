System.register(["aurelia-binding"], function (exports_1, context_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_binding_1, humanizeDuration, HumanizeValueConverter;
    return {
        setters: [
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            }
        ],
        execute: function () {
            humanizeDuration = require('humanize-duration');
            HumanizeValueConverter = (function () {
                function HumanizeValueConverter() {
                }
                HumanizeValueConverter.prototype.toView = function (value, options) {
                    return humanizeDuration(value, options);
                };
                HumanizeValueConverter = __decorate([
                    aurelia_binding_1.valueConverter('humanize')
                ], HumanizeValueConverter);
                return HumanizeValueConverter;
            }());
            exports_1("HumanizeValueConverter", HumanizeValueConverter);
        }
    };
});
