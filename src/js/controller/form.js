'use strict';

import {default as StorageService} from '../data/storage.js';
import {default as NoteService} from '../model/note-service.js';
import {default as initNotesList} from './list.js';

class FormCtrl {
    constructor (note, action) {
        this.action = action;
        this.note = note;
        this.noteService = new NoteService();
        this.storageService = new StorageService();
        this.noteFormTemplateCreator = Handlebars.compile(document.getElementById('js-note-form-template').innerHTML);
    }

    showNoteForm() {
        document.getElementById('js-content-container').innerHTML = this.noteFormTemplateCreator({
            note: this.note,
            importanceOptions: this.noteService.importanceOptions
        });
    }

    updateUI() {
        this.showNoteForm();
        document.getElementById('js-note-form').addEventListener('submit', this.handleSaveNote.bind(this));
        document.getElementById('js-note-form').addEventListener('input', this.handleInvalidForm.bind(this));
        document.getElementById('js-note-form').addEventListener('focusout', this.handleInvalidForm.bind(this));
        document.getElementById('js-show-notes').addEventListener('click', this.handleShowNotes.bind(this));
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

    handleSaveNote(event) {
        event.preventDefault();
        this.note.title = document.getElementById('js-note-title').value;
        this.note.description = document.getElementById('js-note-description').value;
        this.note.importance = document.querySelector('#js-note-importance>input:checked').value;
        this.note.dueDate = document.getElementById('js-note-due-date').value;
        if (this.action === 'new') {
            this.noteService.addNote(this.note);
        } else if (this.action === 'edit') {
            this.storageService.updateNote(this.note);
        }
        initNotesList();
    }

    handleShowNotes() {
        initNotesList();
    }

}

function init(note, action) {
    const formCtrl = new FormCtrl(note, action);
    formCtrl.updateUI();
}

export default init;