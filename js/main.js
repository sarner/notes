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

    function log(message) {
        if ( typeof message === 'string' ) {
            console.log('Notes_Main: ' + message);
        } else {
            console.error('Notes_Main: log(): Wrong message type!');
        }
    }
    
    function setStyle(style) {
        const STYLES = ['black-white', 'colored'];
        const STYLE_VALUE = style.value;
        try {
            if ( STYLE_VALUE === '' ) { throw 'empty' }
            if ( !STYLES.includes(STYLE_VALUE) ) { throw 'not supported' }
        }
        catch (e) {
            log('setStyle(): Parameter is ' + e + '!');
        }
        const BODY_ELEMENT = document.getElementsByTagName('body')[0];
        const CLASS_NAME = 'app-colored';
        if ( STYLE_VALUE === 'black-white' ) {
            BODY_ELEMENT.classList.remove(CLASS_NAME);
        } else if ( STYLE_VALUE === 'colored' ) {
            BODY_ELEMENT.classList.add(CLASS_NAME);
        }
    }

    function showNotesList() {
        document.getElementById('edit-notes').classList.add('hidden');
        document.getElementById('view-notes').classList.remove('hidden');
    }
    
    function editNote(id) {
        try {
            id = parseInt(id);
            if ( id === '' ) { throw 'empty' }
            if ( isNaN(id) ) { throw 'not a number' }
        }
        catch (e) {
            log('editNote(): Parameter is ' + e + '!');
        }
        document.getElementById('view-notes').classList.add('hidden');
        document.getElementById('edit-notes').classList.remove('hidden');
    }

    return {
        log: log,
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
    Notes_Main.log('Application initialized');
})();