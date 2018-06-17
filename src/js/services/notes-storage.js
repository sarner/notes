'use strict';

import AjaxUtil from '../utils/ajax-utils.js';

class StorageRestService {

    constructor () {
        this.ajaxUtil = new AjaxUtil();
    }

    async getNotes() {
        return await this.ajaxUtil.sendRequest(
            'GET',
            '/notes',
            undefined,
            {'Content-Type': 'application/json'}
        );
    }

    async addNote(note) {
        return await this.ajaxUtil.sendRequest(
            'POST',
            '/notes',
            note,
            {'Content-Type': 'application/json'}
        );
    }

    async updateNote(id, changes) {
        return await this.ajaxUtil.sendRequest(
            'PUT',
            `/notes/${id}`,
            changes,
            {'Content-Type': 'application/json'}
        );
    }

    async deleteNote(id) {
        return await this.ajaxUtil.sendRequest(
            'DELETE',
            `/notes/${id}`,
            undefined,
            {'Content-Type': 'application/json'}
        );
    }

    async getNoteById(id) {
        return await this.ajaxUtil.sendRequest(
            'GET',
            `/notes/${id}`,
            undefined,
            {'Content-Type': 'application/json'}
        );
    }
}

export default StorageRestService;