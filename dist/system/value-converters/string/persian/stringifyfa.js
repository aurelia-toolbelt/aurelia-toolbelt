System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, wfa, StringifyFaValueConverter;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            wfa = require('./wordifyfa.js');
            StringifyFaValueConverter = (function () {
                function StringifyFaValueConverter() {
                }
                StringifyFaValueConverter.prototype.toView = function (number) {
                    var len = number.toString().length;
                    if (len === 0) {
                        return '';
                    }
                    else if (len <= 15) {
                        return wfa.wordifyfa(number, 0);
                    }
                    else {
                        return 'عدد بسیار بزرگ است و قابل تبدیل نیست';
                    }
                };
                StringifyFaValueConverter = __decorate([
                    aurelia_framework_1.valueConverter('stringifyfa')
                ], StringifyFaValueConverter);
                return StringifyFaValueConverter;
            }());
            exports_1("StringifyFaValueConverter", StringifyFaValueConverter);
        }
    };
});
