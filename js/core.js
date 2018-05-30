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

    function compileTemplate(templateID, context) {
        const templateScript = getElements('#' + templateID)[0].innerHTML;
        const template = Handlebars.compile(templateScript);
        return template(context);
    }

    function getElements(selectionStatement) {
        if ( selectionStatement === '' ) { throw Error('Parameter is empty!'); }
        return document.querySelectorAll(selectionStatement);
    }

    function addClass(selectionStatement, className) {
        if (selectionStatement === '' || className === '') { throw Error('Parameters are empty!'); }
        let elements = document.querySelectorAll(selectionStatement);
        for (let i = 0; i < elements.length; ++i) {
            elements[i].classList.add(className);
        }
    }

    function removeClass(selectionStatement, className) {
        if (selectionStatement === '' || className === '') { throw Error('Parameters are empty!'); }
        let elements = document.querySelectorAll(selectionStatement);
        for (let i = 0; i < elements.length; ++i) {
            elements[i].classList.remove(className);
        }
    }


    return {
        toFormattedDateString: toFormattedDateString,
        compileTemplate: compileTemplate,
        getElements: getElements,
        addClass: addClass,
        removeClass: removeClass
    };

})();