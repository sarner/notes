'use strict';

class StorageService {
    constructor () {
        this.notesKey = 'notes';
    }

    readLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    writeLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    order(object1, object2) {
        if (this.orderBy.reverse) {
            return (object1[this.orderBy.name] > object2[this.orderBy.name]) ? 1 : -1;
        } else {
            return (object1[this.orderBy.name] > object2[this.orderBy.name]) ? -1 : 1;
        }
    }

    getNotes(orderBy, filter) {
        let notes = this.readLocalStorage(this.notesKey);
        if (notes) {
            if (filter) {
                notes = notes.filter(note => {
                    return !Boolean(note[filter]);
                });
            }
            if (orderBy) {
                this.orderBy = orderBy;
                notes.sort(this.order.bind(this));
            }
        }
        return notes || [];
    }

    addNote(note) {
        let notes = this.readLocalStorage(this.notesKey);
        notes.push(note);
        this.writeLocalStorage(this.notesKey, notes);
        return notes;
    }

    updateNote(note) {
        let notes = this.readLocalStorage(this.notesKey);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].creationDate === note.creationDate) {
                notes[i] = note;
                break;
            }
        }
        this.writeLocalStorage(this.notesKey, notes);
    }

    deleteNote(note) {
        let notes = this.readLocalStorage(this.notesKey);
        let result = notes.filter(item => {return item.creationDate !== note.creationDate});
        this.writeLocalStorage(this.notesKey, result);
        return result;
    }

    getNoteById(id) {
        const notes = this.readLocalStorage(this.notesKey);
        return notes.filter(note => {return note.creationDate === id})[0];
    }
}

export default StorageService;