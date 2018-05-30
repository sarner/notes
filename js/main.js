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

    function renderElements(templateID, context) {
        const parentElement = Notes_Core.getElements('main')[0];
        parentElement.innerHTML = Notes_Core.compileTemplate(templateID, context);
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

    function sortByDueDate() {
        const reverse = Notes_DataHandling.loadAll('sort').reverse ? false : true;
        Notes_DataHandling.saveAll('sort', { field: 'dueDate', reverse: reverse });
        showNotesList();
    }

    function sortByCreationDate() {
        const reverse = Notes_DataHandling.loadAll('sort').reverse ? false : true;
        Notes_DataHandling.saveAll('sort', { field: 'creationDate', reverse: reverse });
        showNotesList();
    }

    function sortByImportance() {
        const reverse = Notes_DataHandling.loadAll('sort').reverse ? false : true;
        Notes_DataHandling.saveAll('sort', { field: 'importance', reverse: reverse });
        showNotesList();
    }

    function filterFinishedNotes() {
        const showFinished = Notes_DataHandling.loadAll('filter').showFinished ? false : true;
        Notes_DataHandling.saveAll('filter', { showFinished: showFinished });
        showNotesList();
    }

    function showNotesList() {
        let notes = Notes_DataHandling.loadAll('notes');
        const sorting = [
            {
                name: 'dueDate',
                description: 'By due date',
                fnc: 'Notes_Main.sortByDueDate()',
                comparison: 'date'
            },
            {
                name: 'creationDate',
                description: 'By creation date',
                fnc: 'Notes_Main.sortByCreationDate()',
                comparison: 'date'
            },
            {
                name: 'importance',
                description: 'By importance',
                fnc: 'Notes_Main.sortByImportance()',
                comparison: 'value'
            }
        ];
        const sort = Notes_DataHandling.loadAll('sort');
        const showFinished = Notes_DataHandling.loadAll('filter').showFinished ? true : false;
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
        if ( date === '' ) { throw Error('Parameter is empty!'); }
        if ( isNaN(Date.parse(date)) ) { throw Error('Parameter is not a date!'); }
        Notes_DataHandling.deleteItem('notes', date);
        showNotesList();
    }

    return {
        setStyle: setStyle,
        showNotesList: showNotesList,
        sortByDueDate: sortByDueDate,
        sortByCreationDate: sortByCreationDate,
        sortByImportance: sortByImportance,
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