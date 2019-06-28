'use strict';
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
        typeof define === 'function' && define.amd ? define(['react'], factory) :
            (global.ReactEno = factory(global.React));
}(this, (function (React) {
    'use strict';
    console.log(React)
    return {
        version: "5.2.0",
        h: React.createElement,
        WeElement: React.Component
    }
})));