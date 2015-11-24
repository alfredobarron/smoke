#ngScrollSpy

###What is it?
A continuation of a previous project of mine, [ngPagemenu](https://github.com/mg/ngPagemenu), that adds features such as more defined api to work with the scroll event and an affix directive.

###What functionality does it provide?

+ *ScrollSpy*: a service that provides an saner api to work with the scroll event.
+ *affix*: a directive to affix an DOM element to a boundary of the browser window.
+ *pagemenu* and pageitems: two directives to build a menu from the contents in the page.

###The ScrollSpy service
The *ScrollSpy* service provides an api to work with the scroll event. It builds up the two following objects that represent the event:

####The Scroll Data Object
    {
        width,              // width of browser window
        height,             // height of browser window
        maxWidth,           // width of document
        maxHeight,          // height of document
        posX,               // x position
        posY,               // y position
        hasOverscroll,      // did we overscroll?
        overscrollLeft,     // did we overscroll to the left?
        overscrollRight,    // did we overscroll to the right?
        overscrollTop,      // did we overscroll to the top?
        overscrollBottom    // did we overscroll to the bottom?
    }

####The Scroll Delta Object
    {
        width,      // the difference in width from last scroll event
        height,     // the difference in height from last scroll event
        maxWidth,   // the difference in document width from last scroll event
        maxHeight   // the difference in document height from last scroll event
        posX,       // the difference in x posiiton from last scroll event
        posY,       // the difference in y position from last scroll event
        velocityX,  // the velocity of the change in the x position
        velocityY   // the velocity of the change in the y position
    }
The data is normalized, e.g. any overscroll data is removed and instead flags are added to the data. The velocity is calculated as poistion delta divided by window size, e.g. (curY - prevY) / height.

#####Registering a scroll handler

    ScrollSpy.addHandler(cond,handler) { return handler-id }:
    cond: function(ScrollData, ScrollDelta) { return true/false }
    handler: function(ScrollData, ScrollDelta)

A generic function to add a scroll handler. The *cond* function return true or false based on the data in the two parameters it receives. If the *cond* function returns true the handler get's called with the two objects. The addHandler function returns an id to the handler. Use the id to clean up once the handler is no longer needed. **In most cases you should not use this hook unless you need very special condition logic**.

#####Cleanup on destory event

    ScrollSpy.removeHandler(id):

Remove handler. Use this to clean up once you don't need to receive the event any more.

#####Trigger the scroll event

    ScrollSpy.trigger(): 

Use this function to programatically trigger a scroll event. Sets the property *isForced* to true while the event handlers are executed.

#####Recieve all scroll events

    ScrollSpy.onScroll(handler) { return handler-id }:
    
    handler: function(ScrollData, ScrollDelta)

Register a handler that receives all scroll events.

#####Handling scrolling along single axis

    ScrollSpy.onYScroll(handler) { return handler-id }:
    ScrollSpy.onXScroll(handler) { return handler-id }:
    
    handler: function(pos, delta, ScrollData, ScrollDelta)

Register a handler to receive a scroll event along the Y axis or the X axis.

#####Handling vertical overscroll

    ScrollSpy.onOverscrollVert(handler) { return handler-id }:
    ScrollSpy.onOverscrollTop(hatndler) { return handler-id }:
    ScrollSpy.onOverscrollBottom(handler) { return handler-id }:
    
    handler: function(ScrollData, ScrollDelta)

Recieve overscroll events along the Y axis.

#####Handling horizontal overscroll

    ScrollSpy.onOverscrollHorz(handler) { return handler-id }:
    ScrollSpy.onOverscrollLeft(handler) { return handler-id }:
    ScrollSpy.onOverscrollRight(handler) { return handler-id }:
    handler: function(ScrollData, ScrollDelta)

Recieve overscroll events along the X axis.

### The affix directive
Add *affix* to any DOM element as an attribute to affix it to an edge of the browser window. 

    <div affix>Affixed!</div>

The default edge is top. In the previous example the class *affix* will be added to the *div* once it hits the browser top edge.

    <div affix="bottom" affix-class="affixed">Affixed to bottom!</div>

The class *affixed* will be added to the class once it reaches the bottom edge of the browser window.

Possible values for *affix* are *top*, *bottom*, *left* and *right*.

### The pagemenu and pageitems directives
The module provides two directives, *pageitems* attribute and *<pagemenu>* tag. The *pageitems* tag will parse the included HTML and query for items with a certain class. The menu will then be generated in the DOM where you put the *<pagemenu>* tag from that list of items. 

The *pageitems* attribute accepts two parameters, *selector* and *topmargin*. The *selector* specifies the class used to query the DOM for menu items. The *topmargin* specifies a scrolling offset that is useful if you contain a static header and don't want your items to be under that static header when you click on the menu to scroll to them.

The list is mapped to a tree using the following heuristic. A type is generated for the item based on the tag name and classes. The type is compared to the previous item's type. If they are equal this new item is a sibling of the previous item. Otherwise we traverse a stack of parents. If a matching type is found the stack is popped to that level and the new item becomes a sibling at that level. If no parent is found the stack is pushed and the new item becomes a child of the last item.

For a more visual demonstration, consider the following list of items:

    <h2 id="1" class="item">Item 1</h2>
    <h2 id="2" class="item">Item 2</h2>
    <h3 id="3" class="item">Item 3</h3>
    <h4 id="4" class="item">Item 4</h4>
    <h4 id="5" class="item">Item 5</h4>
    <h2 id="6" class="item">Item 6</h2>
    <h2 id="7" class="item subitem">Item 7</h2>

This will be mapped to the following tree:

    Item 1
    Item 2
        Item 3
            Item 4
            Item 5
    Item 6
        Item 7

###How do I use it?
Install with bower:

    bower install ngScrollSpy --save

Add a &lt;script&gt; to your index.html:

    <script src="/bower_components/ngScrollSpy/dist/ngScrollSpy.min.js"></script>

And add ngScrollSpy as a dependency for your app:

    angular.module('myApp', ['ngScrollSpy']);

###Dependencies?
Only AngularJS.

###Example?
The *demo* directory contains three demo files:

+ *horz.html*: A demonstration of affixing a DOM element to either the left or the right edge of the window.
+ *vert.html*: A demonstration of affixing a DOM element to either the top or the bottom edge of the window.
+ *pagemenu.html*: A demonstration of a page menu.

###Credits?
Aside for the Bootstrap people for the obvious inspiration, the pagemenu code was inspired by Evil Closet Monkey's answer to a question on [StackExchange](http://stackoverflow.com/questions/17470370/how-to-implement-a-scrollspy-in-angular-js-the-right-way).

###And you are?
Magnús Örn Gylfason, a web programmer working in the banking industry in Iceland. You can contact me at

+ Twitter: [@mgns74](https://www.twitter.com/mgns74)
+ Google+: [Magnús Örn Gylfason](https://plus.google.com/u/0/+MagnúsÖrnGylfason/posts)

###Licence
The MIT License (MIT)

Copyright (c) 2014 Magnús Örn Gylfason

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.