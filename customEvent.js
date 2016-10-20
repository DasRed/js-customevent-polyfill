'use strict';

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return root.CustomEvent = factory(root.CustomEvent, root.Event);
        });

    } else if (typeof exports !== 'undefined') {
        root.CustomEvent = factory(root.CustomEvent, root.Event);

    } else {
        root.CustomEvent = factory(root.CustomEvent, root.Event);
    }
})(this, function (CustomEventOriginal, Event) {
    /**
     *
     * @param {String} typeArg
     * @param {Object} [customEventInit]
     * @param {Boolean} [customEventInit.bubbles]
     * @param {Boolean} [customEventInit.cancelable]
     * @param {Object} [customEventInit.detail]
     * @return {CustomEvent}
     * @constructor
     */
    function CustomEvent(typeArg, customEventInit) {
        var evt, origPrevent;
        customEventInit = customEventInit || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };

        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(typeArg, customEventInit.bubbles, customEventInit.cancelable, customEventInit.detail);

        return evt;
    };

    // prototype
    CustomEvent.prototype = Object.create(Event.prototype);

    // test if constructable, if not, return the CustomEvent Polyfill
    try {
        new CustomEventOriginal('test');
    } catch (e) {
        return CustomEvent;
    }

    // use original CustomEventConstructor
    return CustomEventOriginal;
});
