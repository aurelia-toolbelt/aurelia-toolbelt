var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var r = require('./scripts/rial.js');
    var TomanValueConverter = (function () {
        function TomanValueConverter() {
        }
        TomanValueConverter.prototype.toView = function (number, config) {
            var len = number.toString().length;
            if (len === 0) {
                return '';
            }
            else {
                var rial = void 0;
                if (config === undefined || config == null) {
                    rial = new r.Rial({
                        decimal: ',',
                        alphabet: 'fa',
                        currency: 'تومان',
                        cut: 1
                    });
                }
                else {
                    rial = new r.Rial(config);
                }
                return rial.get(number.toString());
            }
        };
        TomanValueConverter = __decorate([
            aurelia_framework_1.valueConverter('toman')
        ], TomanValueConverter);
        return TomanValueConverter;
    }());
    exports.TomanValueConverter = TomanValueConverter;
});
