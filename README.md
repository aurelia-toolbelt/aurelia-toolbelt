# aurelia-toolbelt ( *NOT yet production ready* )

## A bunch of tools for creating rich aurelia applications. :wink:


[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/shahabganji/aurelia-toolbelt.svg?branch=dev)](https://travis-ci.org/shahabganji/aurelia-toolbelt)
[![npm version](https://badge.fury.io/js/aurelia-toolbelt.svg)](https://badge.fury.io/js/aurelia-toolbelt)

### How to get everything installed after download
* run `node setup`

This will install all the npm packages in root and sample folder.


### How to test with sample folder

* run `gulp watch`

This will transpile everthing using fusebox and start local sample at `http://localhost:4444`

Plugin source and sample source is typechecked/tslinted using fusebox-typechecker


### How to build

* run `gulp build`

This will use the fusebox-typechecker to test if any errors is found, if errors is found it will not clean up and make new build
