'use strict';

import {notesStorage} from '../services/notes-storage';
import SecurityUtil from '../utils/security';

class NotesCtrl {

    async getNotes(request, response) {
        response.json(
            (await notesStorage.getAll(SecurityUtil.currentUser(request)) || [])
        );
    }

    async getNoteById(request, response) {
        response.json(
            await notesStorage.getById(request.params.id, SecurityUtil.currentUser(request))
        );
    }

    async addNote(request, response) {
        response.json(
            await notesStorage.add(
                request.body.creationDate,
                request.body.title,
                request.body.description,
                request.body.importance,
                request.body.dueDate,
                request.body.completionDate,
                request.body.completed,
                SecurityUtil.currentUser(request)
            )
        );
    }

    async updateNote(request, response) {
        response.json(
            await notesStorage.update(request.params.id, request.body, SecurityUtil.currentUser(request))
        );
    }

    async deleteNote(request, response) {
        response.json(
            await notesStorage.delete(request.params.id, SecurityUtil.currentUser(request))
        );
    }

}

export const notesCtrl = new NotesCtrl();