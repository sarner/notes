'use strict';

import {authentication} from '../services/authentication.js';
import {default as EventHandler} from './event.js';
import {default as Note} from '../model/note.js';
import {notesMgr} from '../model/notes-manager.js';
import '../templating/helper.js';
import '../templating/note-form.js';

class FormCtrl {
    constructor (noteId) {
        this.noteId = noteId;
        this.initEventHandlers();
        this.noteFormTemplateCreator = Handlebars.compile(document.getElementById('js-note-form-template').innerHTML);
        this.initListeners();
    }

    async build() {
        const note = await notesMgr.getNoteById(this.noteId) || {};
        this.note = new Note(note);
        this.updateUI();
    }

    initEventHandlers() {
        this.formEventHandler = new EventHandler();
        this.logoutEventHandler = new EventHandler();
    }

    initListeners() {
        this.logoutEventHandler.addListener(
            'js-logout',
            'click',
            this.handleLogout
        );
        this.formEventHandler.addListener(
            'js-note-form',
            'submit',
            this.handleSaveNote.bind(this)
        );
        this.formEventHandler.addListener(
            'js-note-form',
            'input',
            this.handleInvalidForm.bind(this)
        );
        this.formEventHandler.addListener(
            'js-note-form',
            'focusout',
            this.handleInvalidForm.bind(this)
        );
        this.formEventHandler.addListener(
            'js-show-notes',
            'click',
            this.handleShowNotes.bind(this)
        );
    }

    showNoteForm() {
        this.formEventHandler.unregisterEvents();
        this.logoutEventHandler.unregisterEvents();
        document.getElementById('js-content-container').innerHTML = this.noteFormTemplateCreator({
            note: this.note,
            importanceOptions: notesMgr.importanceOptions
        });
        this.formEventHandler.registerEvents();
        this.logoutEventHandler.registerEvents();
    }

    updateUI() {
        this.showNoteForm();
        document.body.classList.remove('hidden');
    }

    handleInvalidForm(event) {
        const element = event.target.closest('.js-validate');
        if (event.target.closest('.js-validate') === null ) {
            return false;
        }
        const errorElement = element.nextElementSibling;
        if (element.checkValidity()) {
            errorElement.classList.add('form-group__error--hidden');
        } else {
            errorElement.classList.remove('form-group__error--hidden');
        }
    }

    async handleSaveNote(event) {
        event.preventDefault();
        this.note.title = document.getElementById('js-note-title').value;
        this.note.description = document.getElementById('js-note-description').value;
        this.note.importance = document.querySelector('#js-note-importance>input:checked').value;
        this.note.dueDate = document.getElementById('js-note-due-date').value;
        if (this.noteId === null) {
            await notesMgr.addNote(this.note);
        } else {
            await notesMgr.updateNote(this.noteId, this.note);
        }
        this.handleShowNotes();
    }

    handleShowNotes() {
        window.location.assign('/');
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
    const url = new URL(window.location.href);
    const formCtrl = new FormCtrl(url.searchParams.get('id'));
    formCtrl.build();
}

window.addEventListener('load', init);