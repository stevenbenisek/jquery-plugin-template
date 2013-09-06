# jquery-plugin-template

A simple object-oriented template for creating jQuery plugins. It allows you to
maintain a [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) workflow
and minimizes the need to write boilerplate code. The template respects the
official [jQuery plugin authoring guide](http://learn.jquery.com/plugins/).

## Walkthrough

### Plugin namespace

Before diving in you should consider picking an approriate name for your plugin.
Set the `NAMESPACE` constant according your choice. It will be referenced
throughout the template making it really easy to update your plugin name
should you ever feel the need to do so.

The `SELECTOR` constant is used as a part of the [plugin data API](#data-api).

``` javascript
/**
 * Plugin NAMESPACE and SELECTOR
 * @type {String}
 * @api private
 */
var NAMESPACE = 'walkthrough',
    SELECTOR = '[data-' + NAMESPACE + ']';
```

### Plugin constructor

The constructor provides access to the DOM element and the options via the
instance. Both the options, extended with the defaults, and a jQuery version of
the DOM element are mapped to the plugin instance: `this.options` and
`this.$element`. The original text of the DOM element is also stored as an
instance property.

``` javascript
/**
 * Plugin constructor
 * @param {Node} element
 * @param {Object} [options]
 * @api public
 */
function Plugin (element, options) {
    this.options = $.extend(true, $.fn[NAMESPACE].defaults, options);
    this.$element = $(element);

    this.originalText = this.$element.text();
}
```

### Plugin prototype

All public facing methods and properties, including the plugin version, are
bound to the plugin prototype. Overwriting the prototype necessitates restoring
the constructor and prototype relationship: `constructor: Plugin`.

``` javascript
/**
 * Plugin prototype
 * @type {Object}
 * @api public
 */
Plugin.prototype = {
    constructor: Plugin,
    version: '1.0.0',
    init: function () {
        this.$element.html(this.options.text);
    },
    restore: function () {
        this.$element.html(this.originalText);
    }
};
```

### Plugin definition

The plugin definition acts as a wrapper around the constructor and is bound to
the jQuery object. This prevents against multiple plugin instantiations and
allows us to access the plugin functionality as a jQuery function. By default
the `init` method is called. This can be easily overruled by passing a method,
e.g. `restore`.

``` javascript
/**
 * jQuery plugin definition
 * @param  {String} [method]
 * @param  {Object} [options]
 * @return {Object}
 * @api public
 */
$.fn[NAMESPACE] = function (method, options) {
    return this.each(function () {
        var $this = $(this),
            data = $this.data('fn.' + NAMESPACE);
        options = (typeof method === 'object') ? method : options;
        if (!data) {
            $this.data('fn.' + NAMESPACE, (data = new Plugin(this, options)));
        }
        data[(typeof method === 'string') ? method : 'init']();
    });
};
```

### Plugin defaults

The default plugin settings are exposed making it very easy for users to step in
and override the defaults with minimal code.

``` javascript
/**
 * jQuery plugin defaults
 * @type {Object}
 * @api public
 */
$.fn[NAMESPACE].defaults = {
    text: 'Walkthrough'
};
```
<a id="data-api"></a>
### Data API

Set `data-walkthrough` on a DOM element to activate the plugin without writing
JavaScript. Event handlers are namespaced for reliable binding and unbinding.

``` javascript
/**
 * jQuery plugin data api
 * @api public
 */
$(document).on('click.' + NAMESPACE, SELECTOR, function (event) {
    $(this)[NAMESPACE]();
    event.preventDefault();
});
```

### Closure

Putting our code inside a closure allows us to keep private variables private
and have complete control over what's publicly exposed without polluting the
global namespace. The function is invoked immediately
([IFFE](http://en.wikipedia.org/wiki/Immediately-invoked_function_expression))
leaving no reference whatsoever.

``` javascript
;(function(window, document, $, undefined) {

...

}(this, this.document, this.jQuery));
```

## Example usage

### API

Activate the plugin by using the data API. Clicking the `<div>` will trigger the
plugin and replace the element's text with 'Walktrough'.

``` html
<div data-walkthrough>API</div>
```

### JavaScript

We could just as easily activate our plugin with JavaScript.
`$('.api').walkthrough()` will render the same result as using our data API
would.

``` html
<div class="api">API</div>
<script>$('.api').walkthrough();</script>
```

Restoring the original text is as easy as passing the correct method:
`$('.api').walkthrough('restore')`.

