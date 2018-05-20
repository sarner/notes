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

    function renderElements(templateID, context) {
        const parentElement = Notes_Core.getElements('main')[0];
        parentElement.innerHTML = Notes_Core.compileTemplate(templateID, context);
    }

    function showNotesList() {
        const notes = Notes_DataHandling.loadAll('notes');
        const context = {
            date: new Date(),
            count: notes.length,
            notes: notes
        };
        renderElements('notes-list-template', context);
    }

    function toggleDescriptionDisplay(element, date) {
        try {
            if ( date === '' ) { throw 'empty' }
            if ( isNaN(Date.parse(date)) ) { throw 'not a date' }
        }
        catch (e) {
            log('error', 'showFullDescription', 'Parameter is ' + e + '!');
        }
        const descriptionContainer = element.parentNode;
        descriptionContainer.getElementsByTagName('div')[0].classList.toggle('full-description');
        descriptionContainer.getElementsByTagName('i')[0].classList.toggle('fa-angle-down');
        descriptionContainer.getElementsByTagName('i')[0].classList.toggle('fa-angle-up');
    }

    function newNote() {
        renderElements('note-form-template', { note: {importance: 3} });
    }

    function editNote(date) {
        try {
            if ( date === '' ) { throw 'empty' }
            if ( isNaN(Date.parse(date)) ) { throw 'not a date' }
        }
        catch (e) {
            log('error', 'editNote', 'Parameter is ' + e + '!');
        }
        const context = {
            note: Notes_DataHandling.loadItem('notes', date)
        };
        renderElements('note-form-template', context);
    }

    function changeNoteState(date, id) {
        try {
            if ( date === '' ) { throw 'empty' }
            if ( isNaN(Date.parse(date)) ) { throw 'not a date' }
        }
        catch (e) {
            log('error', 'editNote', 'Parameter is ' + e + '!');
        }
        let item = Notes_DataHandling.loadItem('notes', date);
        item.done = Notes_Core.getElements('#' + id)[0].checked;
        if ( item.done ) {
            item.completionDate = (new Date()).toISOString().slice(0, -1);
        } else {
            item.completionDate = null;
        }
        Notes_DataHandling.saveItem('notes', item);
        showNotesList();
    }

    function saveNote() {
        let note = {
            creationDate: Notes_Core.getElements('#note-creation-date')[0].value ? Notes_Core.getElements('#note-creation-date')[0].value : (new Date()).toISOString().slice(0, -1),
            title: Notes_Core.getElements('#note-title')[0].value,
            description: Notes_Core.getElements('#note-description')[0].value,
            importance: Notes_Core.getElements('#note-importance>input:checked')[0].value,
            dueDate: Notes_Core.getElements('#note-due-date')[0].value,
            done: Notes_Core.getElements('#note-state')[0].checked
        };
        Notes_DataHandling.saveItem('notes', note);
        showNotesList();
    }

    function deleteNote(date) {
        try {
            if ( date === '' ) { throw 'empty' }
            if ( isNaN(Date.parse(date)) ) { throw 'not a date' }
        }
        catch (e) {
            log('error', 'editNote', 'Parameter is ' + e + '!');
        }
        Notes_DataHandling.deleteItem('notes', date);
        showNotesList();
    }

    return {
        setStyle: setStyle,
        showNotesList: showNotesList,
        toggleDescriptionDisplay: toggleDescriptionDisplay,
        newNote: newNote,
        editNote: editNote,
        changeNoteState: changeNoteState,
        saveNote: saveNote,
        deleteNote: deleteNote
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