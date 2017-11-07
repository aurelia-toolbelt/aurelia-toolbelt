System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var HelloWorld;
    return {
        setters: [],
        execute: function () {
            HelloWorld = (function () {
                function HelloWorld() {
                    this.msg = 'Hello Aurelia!';
                }
                return HelloWorld;
            }());
            exports_1("HelloWorld", HelloWorld);
        }
    };
});
