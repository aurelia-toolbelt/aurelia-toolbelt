
Install ```aurelia-toolbelt``` via ```npm```

```shell
npm install aurelia-toolbelt
```
```shell
yarn add aurelia-toolbelt
```

* If you are using  built-in bundler with Requirejs add the following in your `aurelia.json` file `dependencies` part:

```json
...
  ,
  {
    "name": "aurelia-toolbelt",
    "deps": [
      "jquery"
    ]
  },
...
```

then add the following if you are suing `webpack` in your ```main.ts```:

```js
aurelia.use.plugin(PLATFORM.moduleName('aurelia-toolbelt'));
```

if not use:

```js
aurelia.use.plugin('aurelia-toolbelt');
```
