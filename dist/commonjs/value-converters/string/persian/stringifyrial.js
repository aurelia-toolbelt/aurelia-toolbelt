var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var wfa = require('./scripts/wordifyfa.js');
var StringifyRialValueConverter = (function () {
    function StringifyRialValueConverter() {
    }
    StringifyRialValueConverter.prototype.toView = function (number) {
        var len = number.toString().length;
        if (len === 0) {
            return '';
        }
        else if (len <= 15) {
            return wfa.wordifyRials(number);
        }
        else {
            return 'عدد بسیار بزرگ است و قابل تبدیل نیست';
        }
    };
    StringifyRialValueConverter = __decorate([
        aurelia_framework_1.valueConverter('stringifyrial')
    ], StringifyRialValueConverter);
    return StringifyRialValueConverter;
}());
exports.StringifyRialValueConverter = StringifyRialValueConverter;
