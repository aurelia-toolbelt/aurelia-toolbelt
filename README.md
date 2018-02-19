# aurelia-toolbelt ( v0.9.2-alpha )

* You can find documentation and demo [here](https://aurelia-toolbelt.github.io/)

* We tried not to invent the wheel, but to utilise the existing libraries out there in js world, for [Aurelia](http://aurelia.io). What ever we used or inspired from will definitely have a reference to the original repository or website.
* [Bootstrap](http://getbootstrap.com/docs/4.0/getting-started/introduction/) **v 4.0.0** components,are almost ready for production, however we are still reviewing all of them and there is an alpha npm package [here](https://www.npmjs.com/package/aurelia-toolbelt).

## A bunch of tools for creating rich aurelia applications. :wink:

[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)
[![Build status](https://ci.appveyor.com/api/projects/status/01bgrcnljgephg80?svg=true)](https://ci.appveyor.com/project/shahabganji/aurelia-toolbelt)
[![npm version](https://badge.fury.io/js/aurelia-toolbelt.svg)](https://badge.fury.io/js/aurelia-toolbelt)

* It is worthy to note that this plugin is written with the skeleton provided [here](https://github.com/vegarringdal/skeleton-plugin-typescript), which is highly recommended, thanks to [Vegar Ringdal](https://github.com/vegarringdal).

### How to use the plugin

1. run 

```npm install aurelia-toolbelt@0.9.2-alpha``` 

or

```yarn add aurelia-toolbelt@0.9.2-alpha```

2. use the plugin:

```js
aurelia.use(PLATFORM.moduleName('aurelia-toolbelt'));
```

* Checkout the [documentation](https://aurelia-toolbelt.github.io) for more detail.


### How to get everything installed after download

* install yarn ```npm i -g yarn```
* run `node setup`

or run ```npm install``` on both root folder and sample folder.

That will install all the npm packages in root and sample folder.


### How to test with sample folder

* run `gulp watch`

This will transpile everything using fusebox and start local sample at `http://localhost:4444/`

Plugin source and sample source is typechecked/tslinted using fusebox-typechecker


### How to build

* run `gulp build`

This will use the fusebox-typechecker to test if any errors is found, if errors is found it will not clean up and make new build.
