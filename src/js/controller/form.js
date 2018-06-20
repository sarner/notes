'use strict';

import {default as EventHandler} from "./event.js";
import {styleHandler} from './style.js';
import {default as Note} from '../model/note.js';
import {notesMgr} from '../model/notes-manager.js';
import '../templating/note-form.js';

class FormCtrl {
    constructor (noteId) {
        this.noteId = noteId;
        this.formEventHandler = new EventHandler();
        this.noteFormTemplateCreator = Handlebars.compile(document.getElementById('js-note-form-template').innerHTML);
        this.initListeners();
    }

    async build() {
        const note = await notesMgr.getNoteById(this.noteId) || {};
        this.note = new Note(note);
    }

    initListeners() {
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
        document.getElementById('js-content-container').innerHTML = this.noteFormTemplateCreator({
            note: this.note,
            importanceOptions: notesMgr.importanceOptions
        });
        this.formEventHandler.registerEvents();
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
        window.location = '/';
    }

}

async function init() {
    styleHandler.updateUI();
    const url = new URL(window.location.href);
    const formCtrl = new FormCtrl(url.searchParams.get('id'));
    await formCtrl.build();
    formCtrl.updateUI();
}

export default init;