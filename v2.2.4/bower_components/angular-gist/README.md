angular-gist
============

AngularJS directive for embedding Github gists.

## Install

Bower

```
bower install angular-gist --save
```

NPM

```
npm install angular-gist --save
```

## Usage

Inject module

```js
angular.module('myApp', ['gist']);
```

Use as directive

```html
<gist id="1234556"></gist>
```

## Options

` id ` - Gist ID
