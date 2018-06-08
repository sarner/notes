'use strict';

import {default as StorageService} from '../data/storage.js';
import {default as Note} from './note.js';

class NoteService {
    constructor () {
        this.storage = new StorageService();
        this.orderOptions = [
            new Order('dueDate', 'By due date'),
            new Order('creationDate', 'By creation date'),
            new Order('importance', 'By importance')
        ];
        this.orderBy = this.storage.readLocalStorage('order');
        this.filterOptions = [
            new Filter('completionDate', 'Hide finished notes')
        ];
        this.importanceOptions = [
            new Importance('very-low-importance', 1, 'Very low importance'),
            new Importance('low-importance', 2, 'Low importance'),
            new Importance('normal-importance', 3, 'Normal importance'),
            new Importance('high-importance', 4, 'High importance'),
            new Importance('very-high-importance', 5, 'Very high importance')
        ];
        this.filter = this.storage.readLocalStorage('filter');
        this.notes = this.storage.getNotes(this.orderBy, this.filter) || [];
    }

    get orderBy() {
        return this.orderBy_;
    }

    set orderBy(orderBy) {
        this.orderBy_ = orderBy;
        this.storage.writeLocalStorage('order', this.orderBy);
    }

    get filter() {
        return this.filter_;
    }

    set filter(filter) {
        this.filter_ = filter;
        this.storage.writeLocalStorage('filter', filter);
    }

    get notes() {
        this.notes_ = this.storage.getNotes(this.orderBy, this.filter);
        return this.notes_;
    }

    set notes(notes) {
        this.notes_ = notes;
    }

    addNote(note) {
        if (note instanceof Note) {
            this.notes.push(note);
            this.notes = this.storage.addNote(note);
        } else {
            throw Error('Expected parameter to be instance of class Note');
        }
    }

    deleteNote(note) {
        if (note instanceof Note) {
            this.notes = this.storage.deleteNote(note);
        } else {
            throw Error('Expected parameter to be instance of class Note');
        }
    }
}

class Order {
    constructor (name, description) {
        this.name = name;
        this.description = description;
    }
}

class Filter {
    constructor (name, description) {
        this.name = name;
        this.description = description;
    }
}

class Importance {
    constructor (id, value, description) {
        this.id = id;
        this.value = value;
        this.description = description;
    }
}

export default NoteService;