'use strict';

import {default as StorageService} from '../data/storage.js';
import {default as EventCtrl} from "./event.js";
import {default as NoteService} from '../model/note-service.js';
import {default as initNotesList} from './list.js';

class FormCtrl {
    constructor (note, action) {
        this.action = action;
        this.note = note;
        this.formEventCtrl = new EventCtrl();
        this.noteService = new NoteService();
        this.storageService = new StorageService();
        this.noteFormTemplateCreator = Handlebars.compile(document.getElementById('js-note-form-template').innerHTML);
    }

    initListener() {
        this.formEventCtrl.addListener(
            'js-note-form',
            'submit',
            this.handleSaveNote.bind(this)
        );
        this.formEventCtrl.addListener(
            'js-note-form',
            'input',
            this.handleInvalidForm.bind(this)
        );
        this.formEventCtrl.addListener(
            'js-note-form',
            'focusout',
            this.handleInvalidForm.bind(this)
        );
        this.formEventCtrl.addListener(
            'js-show-notes',
            'click',
            this.handleShowNotes.bind(this)
        );
    }

    showNoteForm() {
        this.formEventCtrl.unregisterEvents();
        document.getElementById('js-content-container').innerHTML = this.noteFormTemplateCreator({
            note: this.note,
            importanceOptions: this.noteService.importanceOptions
        });
        this.formEventCtrl.registerEvents();
    }

    updateUI() {
        this.showNoteForm();
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
    formCtrl.initListener();
    formCtrl.updateUI();
}

export default init;