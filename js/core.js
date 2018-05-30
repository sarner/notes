/**************************************
 * Core module
 **************************************/

'use strict';


/**
 * Notes_core
 *
 * This module is responsible for providing
 * the core functionality of the notes app.
 */
let Notes_Core = (function () {

    function getTwoDigitsNumber(number) {
        return ('0' + number).slice(-2);
    }

    function toFormattedDateString(date) {
        if ( date === '' ) { throw Error('Parameter is empty!'); }
        if ( isNaN(Date.parse(date)) ) { throw Error('Parameter is not a date!'); }
        const year = date.getFullYear();
        const month = getTwoDigitsNumber(date.getMonth());
        const day = getTwoDigitsNumber(date.getDate());
        return [year, month, day].join('-');
    }

    return {
        toFormattedDateString: toFormattedDateString,
        compileTemplate: compileTemplate
    };

})();