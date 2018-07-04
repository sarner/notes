'use strict';

import {authentication} from '../services/authentication.js';
import {default as EventHandler} from './event.js';
import {styleHandler} from './style.js';
import {notesMgr} from '../model/notes-manager.js';
import '../model/number.js';
import '../model/date.js';
import '../model/array.js';
import '../templating/helper.js';
import '../templating/notes-navigation.js';
import '../templating/notes-interaction.js';
import '../templating/notes-list.js';
import '../templating/notes-count.js';

class ListCtrl {

    constructor () {
        this.initEventHandlers();
        this.initTemplateCreators();
        this.initListeners();
        this.updateUI();
    }

    initEventHandlers() {
        this.logoutEventHandler = new EventHandler();
        this.notesNavigationEventHandler = new EventHandler();
        this.notesInteractionEventHandler = new EventHandler();
        this.notesListEventHandler = new EventHandler();
    }

    initTemplateCreators() {
        this.notesNavigationTemplateCreator = Handlebars.compile(document.getElementById('js-notes-navigation-template').innerHTML);
        this.notesInteractionTemplateCreator = Handlebars.compile(document.getElementById('js-notes-interaction-template').innerHTML);
        this.notesListTemplateCreator = Handlebars.compile(document.getElementById('js-notes-list-template').innerHTML);
        this.notesCountTemplateCreator = Handlebars.compile(document.getElementById('js-notes-count-template').innerHTML);
    }

    initListeners() {
        this.logoutEventHandler.addListener(
            'js-logout',
            'click',
            this.handleLogout
        );
        this.notesNavigationEventHandler.addListener(
            'js-new-note',
            'click',
            this.handleNewNote
        );
        this.notesInteractionEventHandler.addListener(
            'js-notes-ordering',
            'click',
            this.handleNotesOrdering.bind(this)
        );
        this.notesInteractionEventHandler.addListener(
            'js-notes-filtering',
            'click',
            this.handleNotesFiltering.bind(this)
        );
        this.notesListEventHandler.addListener(
            'js-notes-list',
            'click',
            this.handleNotesListClick.bind(this)
        );
    }

    setStyle() {
        const styleSelectorElement = document.getElementById('js-style-selector');
        styleSelectorElement.value = styleHandler.style;
        styleSelectorElement.addEventListener('change', (event) => {styleHandler.style = event.target.value;});
    }

    showNotesNavigation() {
        this.notesNavigationEventHandler.unregisterEvents();
        document.getElementById('js-notes-navigation').innerHTML = this.notesNavigationTemplateCreator();
        this.notesNavigationEventHandler.registerEvents();
        this.setStyle();
    }
    
    showNotesInteraction() {
        this.notesInteractionEventHandler.unregisterEvents();
        document.getElementById('js-notes-interaction').innerHTML = this.notesInteractionTemplateCreator({
            orderOptions: notesMgr.orderOptions,
            orderBy: notesMgr.orderBy,
            filterOptions: notesMgr.filterOptions,
            filter: notesMgr.filter
        });
        this.notesInteractionEventHandler.registerEvents();
    }
    
    async showNotesList() {
        this.notesListEventHandler.unregisterEvents();
        const notes = await notesMgr.getNotes();
        document.getElementById('js-notes-list').innerHTML = this.notesListTemplateCreator({
            date: new Date(),
            notes: notes,
            importanceOptions: notesMgr.importanceOptions,
            count: notes.length
        });
        this.notesListEventHandler.registerEvents();
    }

    async showNotesCount() {
        let notes = await notesMgr.getNotes();
        document.getElementById('js-notes-count').innerHTML = this.notesCountTemplateCreator({
            count: notes.filter((note) => {return !note.completed}).length
        });
    }

    updateUI() {
        this.logoutEventHandler.registerEvents();
        this.showNotesNavigation();
        this.showNotesInteraction();
        this.showNotesList();
        this.showNotesCount();
    }

    handleNotesOrdering(event) {
        const element = event.target.closest('button');
        let orderReverse = element.dataset.orderReverse;
        orderReverse = orderReverse === 'false';
        notesMgr.orderBy = {
            name: element.dataset.orderBy,
            reverse: orderReverse
        };
        this.showNotesInteraction();
        this.showNotesList();
    }

    handleNotesFiltering(event) {
        const element = event.target.closest('button');
        if (notesMgr.filter === element.dataset.filter) {
            notesMgr.filter = null;
        } else {
            notesMgr.filter = element.dataset.filter;
        }
        this.showNotesInteraction();
        this.showNotesList();
    }

    handleNewNote() {
        window.location.assign('/edit');
    }

    handleNotesListClick(event) {
        const element = event.target.closest('[data-action]');
        if (element === null) {
            return false;
        }
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
        window.location.assign(`/edit?id=${noteId}`);
    }

    async handleDeleteNote(noteId) {
        await notesMgr.deleteNote(noteId);
        this.showNotesList();
        this.showNotesCount();
    }

    async handleCompletionState(noteId, checked) {
        let changes = {};
        changes.completionDate = checked ? new Date () : null;
        changes.completed = checked;
        await notesMgr.updateNote(noteId, changes);
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

    async handleLogout() {
        await authentication.logout();
        window.location.assign('/login');
    }

}

function init() {
    if (!authentication.isLoggedIn()) {
        window.location.replace('/login');
        return false;
    }
    new ListCtrl();
}

window.addEventListener('load', init);