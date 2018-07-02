'use strict';

import Datastorage from 'nedb-promise';

class Note {
    constructor (creationDate, title, description, importance, dueDate, completionDate, completed, user) {
        this.creationDate = creationDate || new Date();
        this.title = title;
        this.description = description;
        this.importance = importance || 3;
        let defaultDueDate = new Date();
        defaultDueDate.setDate(defaultDueDate.getDate() + 7);
        this.dueDate = dueDate || defaultDueDate.toISOString().slice(0,10);
        this.completionDate = completionDate;
        this.completed = completed;
        this.user = user;
    }
}

class NotesStorage {

    constructor (db) {
        this.db = db || new Datastorage({filename: './data/notes.db', autoload: true});
    }

    async getAll(currentUser) {
        return await this.db.find({user: currentUser});
    }

    async getById(id, currentUser) {
        return await this.db.findOne({_id: id, user: currentUser});
    }

    async add(creationDate, title, description, importance, dueDate, completionDate, completed, currentUser) {
        const note = new Note(creationDate, title, description, importance, dueDate, completionDate, completed, currentUser);
        return await this.db.insert(note);
    }

    async update(id, changes, currentUser) {
        await this.db.update({_id: id, user: currentUser}, {$set: changes});
        return await this.getById(id);
    }

    async delete(id, currentUser) {
        await this.db.remove({_id: id, user: currentUser});
        return true;
    }


}

export const notesStorage = new NotesStorage();