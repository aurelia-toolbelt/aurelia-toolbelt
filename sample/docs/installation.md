
Install ```aurelia-toolbelt``` via ```npm```

```shell
npm install aurelia-toolbelt
```
```shell
yarn add aurelia-toolbelt
```

then use it in your ```main.ts``` or ```boot.ts``` like the following:

```js
aurelia.plugin(PLATFORM.moduleName('aurelia-toolbelt'));
```


this way you've enabled all the features and services within the plugin.

* We don't go through the painful details of how you should configure your  ```aurelia-cli```, ```webpack``` or ```fusebox```. The plugin will work with all of them based on the basic configurations that you should know when using each.
