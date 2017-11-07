System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var FilterByValueConverter;
    return {
        setters: [],
        execute: function () {
            FilterByValueConverter = (function () {
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
            exports_1("FilterByValueConverter", FilterByValueConverter);
        }
    };
});
