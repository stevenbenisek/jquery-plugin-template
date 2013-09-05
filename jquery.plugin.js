/**
 * @library <%= plugin name %>
 * @description <%= description %>
 * @author <%= author_name %> <<%= author_email %>>
 * @license <%= license %>
 */

;(function(window, document, $, undefined) {

    'use strict';

    /**
     * Plugin NAMESPACE and SELECTOR
     * @type {String}
     * @api private
     */
    var NAMESPACE = '<%= plugin name %>',
        SELECTOR = '[data-' + NAMESPACE + ']';

    /**
     * Plugin constructor
     * @param {Node} element
     * @param {Object} [options]
     * @api public
     */
    function Plugin (element, options) {
        this.options = $.extend(true, $.fn[NAMESPACE].defaults, options);
        this.$element = $(element);
    }

    /**
     * Plugin prototype
     * @type {Object}
     * @api public
     */
    Plugin.prototype = {
        constructor: Plugin,
        version: '<%= version %>',
        /**
         * Init method
         * @api public
         */
        init: function () {
            // @todo add method logic
        }
        // @todo add methods
    };

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

    /**
     * jQuery plugin defaults
     * @type {Object}
     * @api public
     */
    $.fn[NAMESPACE].defaults = {
        // @todo add defaults
    };

    /**
     * jQuery plugin data api
     * @api public
     */
    $(document).on('click.' + NAMESPACE, SELECTOR, function (event) {
        $(this)[NAMESPACE]();
        event.preventDefault();
    });

}(this, this.document, this.jQuery));
