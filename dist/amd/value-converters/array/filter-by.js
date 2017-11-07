define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var FilterByValueConverter = (function () {
        function FilterByValueConverter() {
        }
        FilterByValueConverter.prototype.toView = function (array, value) {
            var properties = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                properties[_i - 2] = arguments[_i];
            }
            value = (value || '').trim().toLowerCase();
            if (!value) {
                return array;
            }
            if (properties.length) {
                return array.filter(function (item) {
                    return properties.some(function (property) { return (item[property] || '').toLowerCase().includes(value); });
                });
            }
            return array.filter(function (item) { return item.toLowerCase().includes(value); });
        };
        return FilterByValueConverter;
    }());
    exports.FilterByValueConverter = FilterByValueConverter;
});
