'use strict';

import {default as EventCtrl} from "./event.js";
import {default as Note} from '../model/note.js';
import {default as NoteService} from '../model/note-service.js';
import {default as initNotesList} from './list.js';
import '../templating/note-form.js';

class FormCtrl {
    constructor (noteId) {
        this.noteId = noteId;
        this.formEventCtrl = new EventCtrl();
        this.noteService = new NoteService();
        this.noteFormTemplateCreator = Handlebars.compile(document.getElementById('js-note-form-template').innerHTML);
    }

    async build() {
        const note = await this.noteService.getNoteById(this.noteId) || {};
        this.note = new Note(note);
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
        if (this.noteId === null) {
            this.noteService.addNote(this.note);
        } else {
            this.noteService.updateNote(this.noteId, this.note);
        }
        initNotesList();
    }

    handleShowNotes() {
        initNotesList();
    }

}

async function init(noteId) {
    const formCtrl = new FormCtrl(noteId);
    await formCtrl.build();
    formCtrl.initListener();
    formCtrl.updateUI();
}

export default init;