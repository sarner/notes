/**************************************
 * Main module
 **************************************/

'use strict';


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
        return listElement;
    }

    function showNotesList() {
        const html = Notes_Core.createNoteList();
        const element = html2list(html);
        const parentElement = Notes_Core.getElements('#notes-list')[0];
        if ( element.childElementCount !== 0 ) {
            parentElement.innerHTML = '';
            parentElement.appendChild(element);
            Notes_Core.getElements('.notes-count')[0].innerHTML = '#' + element.childElementCount;
            Notes_Core.addClass('.no-notes', 'hidden');
            Notes_Core.removeClass('.notes-count', 'hidden');
            Notes_Core.removeClass('#notes-interaction', 'hidden');
        } else {
            Notes_Core.addClass('#notes-interaction', 'hidden');
            Notes_Core.addClass('.notes-count', 'hidden');
            Notes_Core.removeClass('.no-notes', 'hidden');
        }
        goToPage('view-notes');
    }

    function newNote() {
        goToPage('edit-notes');
    }
    
    function editNote(date) {
        try {
            if ( date === '' ) { throw 'empty' }
            if ( isNaN(Date.parse(date)) ) { throw 'not a date' }
        }
        catch (e) {
            log('error', 'editNote', 'Parameter is ' + e + '!');
        }
        Notes_DataHandling.loadItem('notes', date);
        goToPage('edit-notes');
        /* TODO: visualize data in form */
    }

    function saveNote() {
        const note = {
            creationDate: Notes_Core.getElements('#note-creation-date')[0].value ? Notes_Core.getElements('#note-creation-date')[0].value : new Date().toISOString(),
            title: Notes_Core.getElements('#note-title')[0].value,
            description: Notes_Core.getElements('#note-description')[0].value,
            importance: Notes_Core.getElements('#note-importance>input:checked')[0].value,
            dueDate: Notes_Core.getElements('#note-due-date')[0].value,
            state: Notes_Core.getElements('#note-state')[0].value
        };
        Notes_DataHandling.save('notes', note);
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