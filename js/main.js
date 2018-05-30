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

    function setStyle(style) {
        const STYLES = ['black-white', 'colored'];
        if ( style.length === 0 ) {
            style = 'black-white';
        }
        if ( !STYLES.includes(style) ) { throw Error('Parameter is not supported!'); }
        Notes_DataHandling.saveAll('style', style);
        document.getElementById('style-selector').value = style;
        const BODY_ELEMENT = document.body;
        for (let i = 0; i < STYLES.length; i++) {
            if (STYLES[i] === style) {
                BODY_ELEMENT.classList.add(style);
            } else {
                BODY_ELEMENT.classList.remove(STYLES[i]);
            }
        }
    }

    function compileTemplate(templateID, context) {
        const templateScript = document.getElementById(templateID).innerHTML;
        const template = Handlebars.compile(templateScript);
        return template(context);
    }

    function renderElements(templateID, context) {
        const parentElement = document.getElementsByTagName('main')[0];
        parentElement.innerHTML = compileTemplate(templateID, context);
    }

    function compareValues(object1, object2) {
        const sort = Notes_DataHandling.loadAll('sort');
        if ( object1[sort.field] > object2[sort.field] ) {
            return  sort.reverse ? 1 : -1;
        }
        if ( object1[sort.field] < object2[sort.field] ) {
            return sort.reverse ? -1 : 1;
        }
        return 0;
    }

    function compareDates(object1, object2) {
        const sort = Notes_DataHandling.loadAll('sort');
        const value1 = Date.parse(object1[sort.field]);
        const value2 = Date.parse(object2[sort.field]);
        if ( value1 > value2 ) {
            return  sort.reverse ? 1 : -1;
        }
        if ( value1 < value2 ) {
            return sort.reverse ? -1 : 1;
        }
        return 0;
    }

    function sort(field) {
        const reverse = !Notes_DataHandling.loadAll('sort').reverse;
        Notes_DataHandling.saveAll('sort', { field: field, reverse: reverse });
        showNotesList();
    }

    function filterFinishedNotes() {
        const showFinished = !Notes_DataHandling.loadAll('filter').showFinished;
        Notes_DataHandling.saveAll('filter', { showFinished: showFinished });
        showNotesList();
    }

    function showNotesList() {
        let notes = Notes_DataHandling.loadAll('notes');
        const sorting = [
            {
                name: 'dueDate',
                description: 'By due date',
                comparison: 'date'
            },
            {
                name: 'creationDate',
                description: 'By creation date',
                comparison: 'date'
            },
            {
                name: 'importance',
                description: 'By importance',
                comparison: 'value'
            }
        ];
        const sort = Notes_DataHandling.loadAll('sort');
        const showFinished = !Notes_DataHandling.loadAll('filter').showFinished;
        if ( !showFinished ) {
            notes = notes.filter((note) => {return !Boolean(note.completionDate);});
        }
        if ( sort ) {
            const activeSorting = sorting.filter((item) => {return item.name === sort.field;})[0];
            if ( activeSorting.comparison === 'date') {
                notes.sort(compareDates);
            } else {
                notes.sort(compareValues);
            }
        }
        const context = {
            sorting: sorting,
            sort: sort,
            filter: showFinished,
            date: new Date(),
            count: notes.filter((note) => {return !Boolean(note.completionDate);}).length,
            notes: notes
        };
        renderElements('notes-list-template', context);
    }

    function toggleDescriptionDisplay(element, date) {
        if ( date === '' ) { throw Error('Parameter is empty!'); }
        if ( isNaN(Date.parse(date)) ) { throw Error('Parameter is not a date!'); }
        const descriptionContainer = element.parentNode;
        descriptionContainer.getElementsByTagName('div')[0].classList.toggle('text-box__text--short');
        descriptionContainer.getElementsByTagName('div')[0].classList.toggle('text-box__text--full');
        descriptionContainer.getElementsByTagName('i')[0].classList.toggle('fa-angle-down');
        descriptionContainer.getElementsByTagName('i')[0].classList.toggle('fa-angle-up');
    }

    function newNote() {
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        renderElements('note-form-template', { note: {importance: 3, dueDate: dueDate.toISOString().slice(0,10)} });
    }

    function editNote(date) {
        if ( date === '' ) { throw Error('Parameter is empty!'); }
        if ( isNaN(Date.parse(date)) ) { throw Error('Parameter is not a date!'); }
        const context = {
            note: Notes_DataHandling.loadItem('notes', date)
        };
        renderElements('note-form-template', context);
    }

    function changeNoteState(date, id) {
        if ( date === '' ) { throw Error('Parameter is empty!'); }
        if ( isNaN(Date.parse(date)) ) { throw Error('Parameter is not a date!'); }
        let item = Notes_DataHandling.loadItem('notes', date);
        item.done = document.getElementById(id).checked;
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
            creationDate: document.getElementById('note-creation-date').value ? document.getElementById('note-creation-date').value : (new Date()).toISOString().slice(0, -1),
            title: document.getElementById('note-title').value,
            description: document.getElementById('note-description').value,
            importance: document.querySelector('#note-importance>input:checked')[0].value,
            dueDate: document.getElementById('note-due-date').value,
            done: document.getElementById('note-state').checked
        };
        Notes_DataHandling.saveItem('notes', note);
        showNotesList();
    }

    function deleteNote(date) {
        if ( date === '' ) { throw Error('Parameter is empty!'); }
        if ( isNaN(Date.parse(date)) ) { throw Error('Parameter is not a date!'); }
        Notes_DataHandling.deleteItem('notes', date);
        showNotesList();
    }

    return {
        setStyle: setStyle,
        showNotesList: showNotesList,
        sort: sort,
        filterFinishedNotes: filterFinishedNotes,
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
    Notes_Main.setStyle(Notes_DataHandling.loadAll('style'));
})();