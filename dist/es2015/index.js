define(["require", "exports", "./hello-world"], function (require, exports, hello_world_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(hello_world_1);
    function configure(config) {
        config.globalResources("./hello-world");
    }
    exports.configure = configure;
});

//# sourceMappingURL=index.js.map
