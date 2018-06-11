'use strict';

import {default as StorageService} from '../data/notes-storage.js';
import {default as EventCtrl} from './event.js';
import {default as StyleService} from './style.js';
import {default as NoteService} from '../model/note-service.js';
import {default as Note} from '../model/note.js';
import {default as initNotesForm} from './form.js';

class ListCtrl {
    constructor () {
        this.storageService = new StorageService();
        this.noteService = new NoteService();
        this.notesNavigationEventCtrl = new EventCtrl();
        this.notesInteractionEventCtrl = new EventCtrl();
        this.notesListEventCtrl = new EventCtrl();
        this.notesCountId = 'js-notes-count';
        this.notesNavigationId = 'js-notes-navigation';
        this.notesInteractionId = 'js-notes-interaction';
        this.notesListId = 'js-notes-list';

        this.notesNavigationTemplateCreator = Handlebars.compile(document.getElementById('js-notes-navigation-template').innerHTML);
        this.notesInteractionTemplateCreator = Handlebars.compile(document.getElementById('js-notes-interaction-template').innerHTML);
        this.notesListTemplateCreator = Handlebars.compile(document.getElementById('js-notes-list-template').innerHTML);
        this.notesCountTemplateCreator = Handlebars.compile(document.getElementById('js-notes-count-template').innerHTML);
    }

    initHtmlStructure() {
        const elementIds = [
            this.notesCountId,
            this.notesNavigationId,
            this.notesInteractionId,
            this.notesListId
        ];
        let df = document.createDocumentFragment();
        elementIds.forEach((id) => {
            let element = document.createElement('div');
            element.setAttribute('id', id);
            df.appendChild(element);
        });
        let containerElement = document.getElementById('js-content-container');
        while (containerElement.firstChild) {
            containerElement.removeChild(containerElement.firstChild);
        }
        containerElement.appendChild(df);
    }

    initListener() {
        this.notesNavigationEventCtrl.addListener(
            'js-new-note',
            'click',
            this.handleNewNote
        );
        this.notesInteractionEventCtrl.addListener(
            'js-notes-ordering',
            'click',
            this.handleNotesOrdering.bind(this)
        );
        this.notesInteractionEventCtrl.addListener(
            'js-notes-filtering',
            'click',
            this.handleNotesFiltering.bind(this)
        );
        this.notesListEventCtrl.addListener(
            'js-notes-list',
            'click',
            this.handleNotesListClick.bind(this)
        );
    }

    showNotesNavigation() {
        this.notesNavigationEventCtrl.unregisterEvents();
        document.getElementById(this.notesNavigationId).innerHTML = this.notesNavigationTemplateCreator();
        this.notesNavigationEventCtrl.registerEvents();
        new StyleService(document.getElementById('js-style-selector'));
    }
    
    showNotesInteraction() {
        this.notesInteractionEventCtrl.unregisterEvents();
        document.getElementById(this.notesInteractionId).innerHTML = this.notesInteractionTemplateCreator({
            orderOptions: this.noteService.orderOptions,
            orderBy: this.noteService.orderBy,
            filterOptions: this.noteService.filterOptions,
            filter: this.noteService.filter
        });
        this.notesInteractionEventCtrl.registerEvents();
    }
    
    showNotesList() {
        this.notesListEventCtrl.unregisterEvents();
        const notes = this.noteService.notes;
        document.getElementById(this.notesListId).innerHTML = this.notesListTemplateCreator({
            date: new Date(),
            notes: notes,
            importanceOptions: this.noteService.importanceOptions,
            count: notes.length
        });
        this.notesListEventCtrl.registerEvents();
    }

    showNotesCount() {
        const notes = this.noteService.notes;
        document.getElementById(this.notesCountId).innerHTML = this.notesCountTemplateCreator({
            count: notes.filter((note) => {return !note.completed}).length
        });
    }

    updateUI() {
        this.showNotesNavigation();
        this.showNotesInteraction();
        this.showNotesList();
        this.showNotesCount();
    }

    handleNotesOrdering(event) {
        const element = event.target.closest('button');
        let orderReverse = element.dataset.orderReverse;
        if (orderReverse === 'false') {
            orderReverse = true;
        } else {
            orderReverse = false;
        }
        this.noteService.orderBy = {
            name: element.dataset.orderBy,
            reverse: orderReverse
        };
        this.showNotesInteraction();
        this.showNotesList();
    }

    handleNotesFiltering(event) {
        const element = event.target.closest('button');
        if (this.noteService.filter === element.dataset.filter) {
            this.noteService.filter = null;
        } else {
            this.noteService.filter = element.dataset.filter;
        }
        this.showNotesInteraction();
        this.showNotesList();
    }

    handleNewNote() {
        initNotesForm(new Note({}), 'new');
    }

    handleNotesListClick(event) {
        const element = event.target.closest('[data-action]');
        let note;
        if (typeof element.dataset.noteId !== 'undefined') {
            note = new Note(this.storageService.getNoteById(element.dataset.noteId));
        }
        switch (element.dataset.action){
            case 'complete':
                this.handleCompletionState(note, element.checked);
                break;
            case 'edit':
                this.handleEditNote(note);
                break;
            case 'delete':
                this.handleDeleteNote(note);
                break;
            case 'toggleTextBoxHeight':
                this.handleTextBoxHeightToggle(element);
                break;
        }
    }

    handleEditNote(note) {
        initNotesForm(note, 'edit');
    }

    handleDeleteNote(note) {
        this.noteService.deleteNote(note);
        this.showNotesList();
    }

    handleCompletionState(note, checked) {
        if (checked) {
            note.completionDate = new Date();
        } else {
            note.completionDate = null;
        }
        note.completed = checked;
        this.storageService.updateNote(note);
        this.showNotesList();
        this.showNotesCount();
    }

    handleTextBoxHeightToggle(element) {
        const descriptionContainer = element.parentNode;
        descriptionContainer.getElementsByTagName('div')[0].classList.toggle('text-box__text--short');
        descriptionContainer.getElementsByTagName('div')[0].classList.toggle('text-box__text--full');
        descriptionContainer.getElementsByTagName('i')[0].classList.toggle('fa-angle-down');
        descriptionContainer.getElementsByTagName('i')[0].classList.toggle('fa-angle-up');
    }

}

function init() {
    const listCtrl = new ListCtrl();
    listCtrl.initHtmlStructure();
    listCtrl.initListener();
    listCtrl.updateUI();
}

export default init;