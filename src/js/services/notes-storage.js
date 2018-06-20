'use strict';

import {ajax} from '../utils/ajax.js';

class NotesStorage {

    async getNotes() {
        return await ajax.sendRequest(
            'GET',
            '/notes',
            undefined,
            {'Content-Type': 'application/json'}
        );
    }

    async addNote(note) {
        return await ajax.sendRequest(
            'POST',
            '/notes',
            note,
            {'Content-Type': 'application/json'}
        );
    }

    async updateNote(id, changes) {
        return await ajax.sendRequest(
            'PUT',
            `/notes/${id}`,
            changes,
            {'Content-Type': 'application/json'}
        );
    }

    async deleteNote(id) {
        return await ajax.sendRequest(
            'DELETE',
            `/notes/${id}`,
            undefined,
            {'Content-Type': 'application/json'}
        );
    }

    async getNoteById(id) {
        return await ajax.sendRequest(
            'GET',
            `/notes/${id}`,
            undefined,
            {'Content-Type': 'application/json'}
        );
    }
}

export const notesStorage = new NotesStorage();