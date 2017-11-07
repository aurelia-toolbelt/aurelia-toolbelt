define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var GroupByValueConverter = (function () {
        function GroupByValueConverter() {
        }
        GroupByValueConverter.prototype.toView = function (array, property) {
            var groups = new Map();
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var item = array_1[_i];
                var key = item[property];
                var group = groups.get(key);
                if (!group) {
                    group = { key: key, items: [] };
                    groups.set(key, group);
                }
                group.items.push(item);
            }
            return Array.from(groups.values());
        };
        return GroupByValueConverter;
    }());
    exports.GroupByValueConverter = GroupByValueConverter;
});
