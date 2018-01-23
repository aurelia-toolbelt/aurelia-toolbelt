
The library consist of several main categories based on ```Aurelia``` features.

1. Binding-Behaviours
2. Components (custom-elements)
3. Custom-Attributes
4. Services
5. Utilities
6. Value-Converters

each of which have 3 sub-categories as below:


* bootstrap
* jquery
* pureJS (vanillaJS) 

you already know how to enable the whole plugin features, you may want to enable or use only a portion of the plugin so that the only thing you need is to walk down the hierarchy.

**e.g.** _You need use only and only bootstrap components within the package:_
```js
aurelia.plugin(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap'));
```

that's all. may I say as simple as possible? thanks.
