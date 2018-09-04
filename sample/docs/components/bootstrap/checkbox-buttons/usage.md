
You should have registered the plugin beforehand

```js
aurelia.use.plugin(PLATFORM.moduleName('aurelia-toolbelt'));
```
or at any further level you are interested down to the ```button``` itself
```js
aurelia.use.plugin(PLATFORM.moduleName('aurelia-toolbelt/components/bootstrap/button'));
```


* Bear in mind that you should always wrap them in ```abt-button-group``` tag which has the ```toggle``` attribute set.

```html
<abt-button-group toggle>
  ...
</abt-button-group>
```
