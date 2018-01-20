# aurelia-toolbelt ( *NOT yet production ready* )

* A simple [demo](https://shahabganji.github.io/aurelia-toolbelt/#/bootstrap)

* We tried not to invent the wheel, but to utilise the existing libraries out there in js world, for [Aurelia](http://aurelia.io). What ever we used or inspired from will definitely have a reference to the original repository or website. _ATM we might missed some references_ though, since the [demo](https://shahabganji.github.io/aurelia-toolbelt/#/bootstrap) above is just for addressing our own curiosity :smile:, we'll promise to update all of them at first release.
* [Bootstrap](http://getbootstrap.com/docs/4.0/getting-started/introduction/) components, which are on top of v4-beta.3, are 90% ready for production, however we are still reviewing all of them and we hope to make a beta release within a fortnight ( approx. 30 Jan 2018) :crossed_fingers: .

* Our top priority was bootstrap components, but you can find value converters, custom attributes, and some components outside bootstrap world, such as value converters for [moment](https://github.com/moment/moment/), or [strman](https://github.com/dleitee/strman), and components like [jquery blockUI](http://malsup.com/jquery/block/), or [lazy-loading images](http://jquery.eisbehr.de/lazy/).

* Almost forgot to mention :smile: that a full documentation will be also provided for every part .

* _Bear in mind that the npm module is **not up-to-date**_ :wink:

## A bunch of tools for creating rich aurelia applications. :wink:

[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)
[![Build status](https://ci.appveyor.com/api/projects/status/01bgrcnljgephg80?svg=true)](https://ci.appveyor.com/project/shahabganji/aurelia-toolbelt)
[![npm version](https://badge.fury.io/js/aurelia-toolbelt.svg)](https://badge.fury.io/js/aurelia-toolbelt)


it consists of three main categories, each of which consists of some sub-categories.

The main categories are:
  * components
  * value converters
  * custom attributes
  * binding behaviors
  * utilities
  * services

above mentioned categories sprinkle into:
  * bootstrap( we are working on bootstrap v4 )
  * jquery
  * vanilla/pure js

libraries. so it's easy to find an element, you seek for a component, go through that directory and in bootstrap folder you will find all components related to bootstrap, and so on.

### How to get everything installed after download

* install yarn ```npm i -g yarn```
* run `node setup`

This will install all the npm packages in root and sample folder.


### How to test with sample folder

* run `gulp watch`

This will transpile everything using fusebox and start local sample at `http://localhost:4444/#/bootstrap/`

Plugin source and sample source is typechecked/tslinted using fusebox-typechecker


### How to build

* run `gulp build`

This will use the fusebox-typechecker to test if any errors is found, if errors is found it will not clean up and make new build
