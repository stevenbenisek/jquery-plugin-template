;(function(window, document, $, undefined) {

    'use strict';

    // Plugin namespace
    var NAMESPACE = 'plugin';

    // Plugin constructor
    function Plugin (element, options) {
        this.options = $.extend(true, $.fn[NAMESPACE].defaults, options);
        this.$element = $(element);
    }

    // Plugin prototype
    Plugin.prototype = {
        // Restore constructor/prototype relationship
        constructor: Plugin,
        init: function () {
            // @todo add method logic
        }
        // @todo add methods
    };

    // Plugin definition
    $.fn[NAMESPACE] = function (method, options) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data(NAMESPACE),
                options = (typeof method == 'object') ? method : options;
            !data && $this.data(NAMESPACE, (data = new Plugin(this, options)));
            data[(typeof method == 'string') ? method : 'init']();
        });
    };

    // Plugin defaults
    $.fn[NAMESPACE].defaults = {
        // @todo add defaults
    };

    // Plugin DOM binding
    // @todo specify target element(s)
    $(document).on('click.' + NAMESPACE, function (event) {
        $(this)[NAMESPACE]();
        event.preventDefault();
    });

}(this, this.document, this.jQuery));
