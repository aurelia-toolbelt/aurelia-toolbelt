# aurelia-toolbelt ( v1.2.3 )

* You can find documentation and demo [here](https://aurelia-toolbelt.github.io/)

* We tried not to invent the wheel, but to utilise the existing libraries out there in js world, for [Aurelia](http://aurelia.io). What ever we used or inspired from will definitely have a reference to the original repository or website.
* [Bootstrap](http://getbootstrap.com/docs/4.0/getting-started/introduction/) __v 4.*__ components,are  ready for production, however we are always reviewing them and there is an [npm package](https://www.npmjs.com/package/aurelia-toolbelt) available.

## A bunch of tools for creating rich aurelia applications. :wink:

[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)
[![Build status](https://ci.appveyor.com/api/projects/status/01bgrcnljgephg80?svg=true)](https://ci.appveyor.com/project/shahabganji/aurelia-toolbelt)
[![npm version](https://badge.fury.io/js/aurelia-toolbelt.svg)](https://badge.fury.io/js/aurelia-toolbelt)

* It is worthy to note that this plugin is written with the skeleton provided by [Vegar Ringdal](https://github.com/vegarringdal). Many thanks to him :smile:

### How to use the plugin

1. run

```shell
npm install aurelia-toolbelt
```

or

```shell
yarn add aurelia-toolbelt
```

2. use the plugin:

```js
aurelia.use.plugin(PLATFORM.moduleName('aurelia-toolbelt'));
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
