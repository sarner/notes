/**************************************
 * Main module
 **************************************/

/**
 * Notes_main
 *
 * This module is responsible for providing
 * the main functionality of the notes app.
 */
let Notes_Main = (function () {

    function log(level, functionName, message) {
        Notes_Logging.log(level, 'Notes_Main', functionName + '(): ' + message);
    }
    
    function setStyle(style) {
        const STYLES = ['black-white', 'colored'];
        const STYLE_VALUE = style.value;
        try {
            if ( STYLE_VALUE === '' ) { throw 'empty' }
            if ( !STYLES.includes(STYLE_VALUE) ) { throw 'not supported' }
        }
        catch (e) {
            log('error', 'setStyle', 'Parameter is ' + e + '!');
        }
        const SELECTION_STATEMENT = 'body';
        const CLASS_NAME = 'app-colored';
        if ( STYLE_VALUE === 'black-white' ) {
            Notes_Core.removeClass(SELECTION_STATEMENT, CLASS_NAME);
        } else if ( STYLE_VALUE === 'colored' ) {
            Notes_Core.addClass(SELECTION_STATEMENT, CLASS_NAME);
        }
    }

    function showNotesList() {
        const CLASS_NAME = 'hidden';
        Notes_Core.addClass('#edit-notes', CLASS_NAME);
        Notes_Core.removeClass('#view-notes', CLASS_NAME);
    }
    
    function editNote(id) {
        try {
            id = parseInt(id);
            if ( id === '' ) { throw 'empty' }
            if ( isNaN(id) ) { throw 'not a number' }
        }
        catch (e) {
            log('error', 'editNote', 'Parameter is ' + e + '!');
        }
        const CLASS_NAME = 'hidden';
        Notes_Core.addClass('#view-notes', CLASS_NAME);
        Notes_Core.removeClass('#edit-notes', CLASS_NAME);
    }

    return {
        setStyle: setStyle,
        showNotesList: showNotesList,
        editNote: editNote
    }

})();


/**
 * Main_initialize()
 * 
 * Automatic initialisation of the main module.
 */
(function Main_initialize() {
    /* TODO: remove unnecessary logging */
    console.info('Notes_Main: Application initialized');
})();