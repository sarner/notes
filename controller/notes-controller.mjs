'use strict';

import {notesStorage} from '../services/notes-storage';

class NotesCtrl {

    async getNotes(request, response) {
        response.json(
            (await notesStorage.getAll() || [])
        );
    }

    async getNoteById(request, response) {
        response.json(
            await notesStorage.getById(request.params.id)
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
                request.body.completed
            )
        );
    }

    async updateNote(request, response) {
        response.json(
            await notesStorage.update(request.params.id, request.body)
        );
    }

    async deleteNote(request, response) {
        response.json(
            await notesStorage.delete(request.params.id)
        );
    }

}

export const notesCtrl = new NotesCtrl();