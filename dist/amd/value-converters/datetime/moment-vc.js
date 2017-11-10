var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var moment = require('jalali-moment');
    var RelativeValueConverter = (function () {
        function RelativeValueConverter() {
        }
        RelativeValueConverter.prototype.toView = function (value, doAsJalali) {
            if (!value) {
                return null;
            }
            if (doAsJalali === true) {
                var m = moment(value);
                m.doAsJalali(doAsJalali);
                var result = m.fromNow();
                m.doAsGregorian();
                return result;
            }
            return moment(value).fromNow();
        };
        RelativeValueConverter = __decorate([
            aurelia_framework_1.valueConverter('relative')
        ], RelativeValueConverter);
        return RelativeValueConverter;
    }());
    exports.RelativeValueConverter = RelativeValueConverter;
    var DateValueConverter = (function () {
        function DateValueConverter() {
        }
        DateValueConverter.prototype.toView = function (value, format, locale) {
            if (format === void 0) { format = 'YYYY/MM/DD'; }
            if (locale === void 0) { locale = 'en'; }
            if (!value) {
                return null;
            }
            var m2 = moment(value).locale(locale);
            return m2.format(format);
        };
        DateValueConverter = __decorate([
            aurelia_framework_1.valueConverter('date')
        ], DateValueConverter);
        return DateValueConverter;
    }());
    exports.DateValueConverter = DateValueConverter;
    var TimeConverter = (function () {
        function TimeConverter() {
        }
        TimeConverter.prototype.toView = function (value, show24Hours) {
            if (show24Hours === void 0) { show24Hours = true; }
            if (!value) {
                return null;
            }
            var format = show24Hours === true || show24Hours === 'true' ? 'HH:mm:ss' : 'hh:mm:ss a';
            console.log("time format is: " + format);
            return moment(value).format(format);
        };
        TimeConverter = __decorate([
            aurelia_framework_1.valueConverter('time')
        ], TimeConverter);
        return TimeConverter;
    }());
    exports.TimeConverter = TimeConverter;
    var AgeValueConverter = (function () {
        function AgeValueConverter() {
        }
        AgeValueConverter.prototype.toView = function (dob) {
            if (!dob) {
                return null;
            }
            return Math.floor(moment().diff(moment(dob), 'year', false));
        };
        AgeValueConverter = __decorate([
            aurelia_framework_1.valueConverter('age')
        ], AgeValueConverter);
        return AgeValueConverter;
    }());
    exports.AgeValueConverter = AgeValueConverter;
});
