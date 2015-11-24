angular-smoothscroll
====================

AngularJS directives to get a smooth scroll effect (like this: http://css-tricks.com/examples/SmoothPageScroll/).
Pure vanilla JS and jQuery versions.

#How to use it?

## Demo 

Here is a demo Plunkr: http://plnkr.co/edit/rD0Zgi6rg3Spc2XeVrZf?p=preview

## Installation

### Build your own copy

1. Build Coffeescript `grunt coffee:dist`
2. Copy generated JS in .tmp folder and include it

### Get the last version

Copy the last version from the `dist/scripts` folder

### Via Twitter Bower (https://github.com/bower/bower)

Run `bower install angular-smoothscroll` in your project

###Add the dependency to your app 
Declare an AngularJS module with a dependency: `app.module('myApp', ['angularSmoothscroll'])`

##Vanilla JS (to improve, too fast) 

Just declare an HTML link element which will start scroll, add the `smooth-scroll` directive and pass the target ID: `<a smooth-scroll target="target">Scroll to Target</a>`

##jQuery version 
Declare an HTML link element which will start scroll, add the `smooth-scroll-jquery` directive and pass the target ID: `<a smooth-scroll-jquery target="target">Scroll to Target</a>`. No target means scroll to top.

You can declare the speed (default is 500): `<a smooth-scroll-jquery target="target" speed="1000">Scroll to Target</a>`

With both versions, you can declare the offset (default is 100): `<a smooth-scroll[-jquery] target="target" offset="30">Scroll to Target</a>`

#How to contribute?

1. Clone this repo
2. Make your changes
3. Test them: `grunt test`
4. Open a pull-request

#To improve

1. Vanilla JS implementation which is not working very well
2. Make the Angular JS unit tests pass (cf. http://stackoverflow.com/questions/16929046/effectively-unit-test-an-angularjs-directive-which-is-manipulating-the-dom?noredirect=1#comment24448390_16929046)

Powered by AngularJS (http://angularjs.org), Yeoman (http://yeoman.io), Grunt (http://gruntjs.com) and Karma (http://karma-runner.github.io/0.8/index.html)