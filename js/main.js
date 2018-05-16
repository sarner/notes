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

    function goToPage(pageName) {
        const PAGES = ['view-notes', 'edit-notes'];
        try {
            if ( pageName === '' ) { throw 'empty' }
            if ( !PAGES.includes(pageName) ) { throw 'not supported' }
        }
        catch (e) {
            log('error', 'goToPage', 'Parameter is ' + e + '!');
        }
        const CLASS_NAME = 'hidden';
        Notes_Core.addClass('main', CLASS_NAME);
        Notes_Core.removeClass('#' + pageName, CLASS_NAME);
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

    function html2list(html) {
        const listElement = Notes_Core.createElement('ul');
        listElement.classList.add('notes-list');
        listElement.innerHTML = html;
        console.log(listElement);
        return listElement;
    }

    function showNotesList() {
        const html = Notes_Core.createNoteList();
        const element = html2list(html);
        Notes_Core.getElements('#notes-list')[0].innerHTML = '';
        Notes_Core.getElements('#notes-list')[0].appendChild(element);
        goToPage('view-notes');
    }

    function newNote() {
        goToPage('edit-notes');
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
        goToPage('edit-notes');
        Notes_DataHandling.load(id);
        /* TODO: visualize data in form */
    }

    function saveNote() {
        const note = {
            title: Notes_Core.getElements('#note-title')[0].value,
            description: Notes_Core.getElements('#note-description')[0].value,
            importance: Notes_Core.getElements('#note-importance>input:checked')[0].value,
            dueDate: Notes_Core.getElements('#note-due-date')[0].value
        };
        let notes = Notes_DataHandling.load('notes');
        notes.push(note);
        Notes_DataHandling.save('notes', notes);
    }

    return {
        setStyle: setStyle,
        showNotesList: showNotesList,
        newNote: newNote,
        editNote: editNote,
        saveNote: saveNote
    }

})();


/**
 * Main_initialize()
 * 
 * Automatic initialisation of the main module.
 */
(function Main_initialize() {
    Notes_Main.showNotesList();
    /* TODO: remove unnecessary logging */
    console.info('Notes_Main: Application initialized');
})();