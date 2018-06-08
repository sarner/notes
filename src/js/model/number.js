'use strict';

Number.prototype.toTwoDigitsString = function () {
    return ('0' + this).slice(-2);
};