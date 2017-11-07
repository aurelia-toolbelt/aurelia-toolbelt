System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var OrderByValueConverter;
    return {
        setters: [],
        execute: function () {
            OrderByValueConverter = (function () {
                function OrderByValueConverter() {
                }
                OrderByValueConverter.prototype.toView = function (array, property, direction) {
                    if (direction === void 0) { direction = 'desc'; }
                    array = array.slice(0);
                    var directionFactor = direction === 'desc' ? -1 : 1;
                    array.sort(function (current, next) {
                        var currentValue = current[property];
                        var nextValue = next[property];
                        if (currentValue > nextValue) {
                            return directionFactor;
                        }
                        else if (currentValue < nextValue) {
                            return -directionFactor;
                        }
                        return 0;
                    });
                    return array;
                };
                return OrderByValueConverter;
            }());
            exports_1("OrderByValueConverter", OrderByValueConverter);
        }
    };
});
