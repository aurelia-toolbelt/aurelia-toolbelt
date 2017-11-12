# aurelia-toolbelt

## A bunch of tools for creating reach aurelia applications. :wink:

[![MIT License][license-image]][license-url]

[![Build][travis-image]][https://travis-ci.org/shahabganji/aurelia-template]

[![NPM][npm-version-image]][https://www.npmjs.com/package/aurelia-toolbelt] 

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
