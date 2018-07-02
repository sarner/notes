'use strict';

import {ajax} from '../utils/ajax.js';
import {settingsStorage} from './settings-storage.js';

class NotesStorage {

    constructor () {
        this.tokenKey = 'token';
    }

    async getNotes() {
        return await ajax.sendRequest(
            'GET',
            '/notes',
            undefined,
            {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + settingsStorage.getSettingByKey(this.tokenKey)
            }
        );
    }

    async addNote(note) {
        return await ajax.sendRequest(
            'POST',
            '/notes',
            note,
            {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + settingsStorage.getSettingByKey(this.tokenKey)
            }
        );
    }

    async updateNote(id, changes) {
        return await ajax.sendRequest(
            'PUT',
            `/notes/${id}`,
            changes,
            {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + settingsStorage.getSettingByKey(this.tokenKey)
            }
        );
    }

    async deleteNote(id) {
        return await ajax.sendRequest(
            'DELETE',
            `/notes/${id}`,
            undefined,
            {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + settingsStorage.getSettingByKey(this.tokenKey)
            }
        );
    }

    async getNoteById(id) {
        return await ajax.sendRequest(
            'GET',
            `/notes/${id}`,
            undefined,
            {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + settingsStorage.getSettingByKey(this.tokenKey)
            }
        );
    }
}

export const notesStorage = new NotesStorage();