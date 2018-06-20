'use strict';

import {default as EventCtrl} from './event.js';
import {default as StyleService} from './style.js';
import {default as NoteService} from '../model/note-service.js';
import '../templating/notes-navigation.js';
import '../templating/notes-interaction.js';
import '../templating/notes-list.js';
import '../templating/notes-count.js';

class ListCtrl {
    constructor () {
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

    setStyle() {
        const styleService = new StyleService();
        this.styleSelectorElement = document.getElementById('js-style-selector');
        this.styleSelectorElement.value = styleService.style;
        this.styleSelectorElement.addEventListener('change', (event) => {styleService.style = event.target.value;});
    }

    showNotesNavigation() {
        this.notesNavigationEventCtrl.unregisterEvents();
        document.getElementById(this.notesNavigationId).innerHTML = this.notesNavigationTemplateCreator();
        this.notesNavigationEventCtrl.registerEvents();
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
    
    async showNotesList() {
        this.notesListEventCtrl.unregisterEvents();
        const notes = await this.noteService.getNotes();
        document.getElementById(this.notesListId).innerHTML = this.notesListTemplateCreator({
            date: new Date(),
            notes: notes,
            importanceOptions: this.noteService.importanceOptions,
            count: notes.length
        });
        this.notesListEventCtrl.registerEvents();
    }

    async showNotesCount() {
        let notes = await this.noteService.getNotes();
        document.getElementById(this.notesCountId).innerHTML = this.notesCountTemplateCreator({
            count: notes.filter((note) => {return !note.completed}).length
        });
    }

    updateUI() {
        this.showNotesNavigation();
        this.setStyle();
        this.showNotesInteraction();
        this.showNotesList();
        this.showNotesCount();
        document.body.classList.remove('hidden');
    }

    handleNotesOrdering(event) {
        const element = event.target.closest('button');
        let orderReverse = element.dataset.orderReverse;
        orderReverse = orderReverse === 'false';
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
        window.location = '/edit';
    }

    handleNotesListClick(event) {
        const element = event.target.closest('[data-action]');
        const noteId = element.dataset.noteId;
        switch (element.dataset.action){
            case 'complete':
                this.handleCompletionState(noteId, element.checked);
                break;
            case 'edit':
                this.handleEditNote(noteId);
                break;
            case 'delete':
                this.handleDeleteNote(noteId);
                break;
            case 'toggleTextBoxHeight':
                this.handleTextBoxHeightToggle(element);
                break;
        }
    }

    handleEditNote(noteId) {
        window.location = `/edit?id=${noteId}`;
    }

    async handleDeleteNote(noteId) {
        await this.noteService.deleteNote(noteId);
        this.showNotesList();
    }

    async handleCompletionState(noteId, checked) {
        let changes = {};
        if (checked) {
            changes.completionDate = new Date();
        } else {
            changes.completionDate = null;
        }
        changes.completed = checked;
        await this.noteService.updateNote(noteId, changes);
        this.showNotesList();
        this.showNotesCount();
    }

    handleTextBoxHeightToggle(element) {
        const descriptionContainer = element.parentNode;
        descriptionContainer.querySelector('div').classList.toggle('text-box__text--short');
        descriptionContainer.querySelector('div').classList.toggle('text-box__text--full');
        descriptionContainer.querySelector('i').classList.toggle('fa-angle-down');
        descriptionContainer.querySelector('i').classList.toggle('fa-angle-up');
    }

}

function init() {
    const listCtrl = new ListCtrl();
    listCtrl.initListener();
    listCtrl.updateUI();
}

export default init;