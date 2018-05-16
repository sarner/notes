/**************************************
 * Core module
 **************************************/

/**
 * Notes_core
 *
 * This module is responsible for providing
 * the core functionality of the notes app.
 */
let Notes_Core = (function () {

    function log(level, functionName, message) {
        Notes_Logging.log(level, 'Notes_Core', functionName + '(): ' + message);
    }

    function createNoteList() {
        const notes = {
            notes: Notes_DataHandling.loadAll('notes')
        };
        const notesList = document.getElementById('notes-list-template').innerHTML;
        const template = Handlebars.compile(notesList);
        return template(notes);
    }

    function getElements(selectionStatement) {
        try {
            if ( selectionStatement === '' ) { throw 'empty' }
        }
        catch (e) {
            log('error', 'getElements', 'Parameter is ' + e + '!');
        }

        return document.querySelectorAll(selectionStatement);
    }

    function createElement(tagName) {
        try {
            if ( tagName === '' ) { throw 'empty' }
        }
        catch (e) {
            log('error', 'createElement', 'Parameter is ' + e + '!');
        }

        return document.createElement(tagName);
    }

    function addClass(selectionStatement, className) {
        try {
            if (selectionStatement === '' || className === '') { throw 'empty' }
        }
        catch (e) {
            log('error', 'addClass', 'Parameters are ' + e + '!');
        }

        let elements = document.querySelectorAll(selectionStatement);
        for (let i = 0; i < elements.length; ++i) {
            elements[i].classList.add(className);
        }
    }

    function removeClass(selectionStatement, className) {
        try {
            if (selectionStatement === '' || className === '') { throw 'empty' }
        }
        catch (e) {
            log('error', 'removeClass', 'Parameters are ' + e + '!');
        }

        let elements = document.querySelectorAll(selectionStatement);
        for (let i = 0; i < elements.length; ++i) {
            elements[i].classList.remove(className);
        }
    }


    return {
        createNoteList: createNoteList,
        getElements: getElements,
        createElement: createElement,
        addClass: addClass,
        removeClass: removeClass
    };

})();


/**
 * Core_initialize()
 *
 * Automatic initialisation of the core module.
 */
(function Core_initialize() {
    /* TODO: remove unnecessary logging */
    console.info('Notes_Core: Module initialized');
})();