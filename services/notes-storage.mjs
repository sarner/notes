'use strict';

import Datastorage from 'nedb-promise';

class Note {
    constructor (creationDate, title, description, importance, dueDate, completionDate, completed) {
        this.creationDate = creationDate || new Date();
        this.title = title;
        this.description = description;
        this.importance = importance || 3;
        let defaultDueDate = new Date();
        defaultDueDate.setDate(defaultDueDate.getDate() + 7);
        this.dueDate = dueDate || defaultDueDate.toISOString().slice(0,10);
        this.completionDate = completionDate;
        this.completed = completed;
    }
}

class NotesStorage {

    constructor (db) {
        this.db = db || new Datastorage({filename: './data/notes.db', autoload: true});
    }

    async getAll() {
        return await this.db.find({});
    }

    async getById(id) {
        return await this.db.findOne({_id: id});
    }

    async add(creationDate, title, description, importance, dueDate, completionDate, completed) {
        let note = new Note(creationDate, title, description, importance, dueDate, completionDate, completed);
        return await this.db.insert(note);
    }

    async update(id, changes) {
        await this.db.update({_id: id}, {$set: changes});
        return await this.getById(id);
    }

    async delete(id) {
        await this.db.delete({_id: id});
        return true;
    }


}

export const notesStorage = new NotesStorage();