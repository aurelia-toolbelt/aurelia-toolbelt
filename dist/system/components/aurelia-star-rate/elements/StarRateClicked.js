System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var StarRateClicked;
    return {
        setters: [],
        execute: function () {
            StarRateClicked = (function () {
                function StarRateClicked(newRate, oldRate) {
                    this.newRate = newRate;
                    this.oldRate = oldRate;
                }
                return StarRateClicked;
            }());
            exports_1("StarRateClicked", StarRateClicked);
        }
    };
});
