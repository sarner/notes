'use strict';

import {default as SettingsStorage} from '../services/settings-storage.js';
import {default as StorageService} from '../services/notes-storage.js';

class NoteService {
    constructor () {
        this.settings = new SettingsStorage();
        this.storage = new StorageService();
        this.orderOptions = [
            new Order('dueDate', 'By due date'),
            new Order('creationDate', 'By creation date'),
            new Order('importance', 'By importance')
        ];
        this.orderBy = this.settings.getSettingByKey('order');
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
        this.filter = this.settings.getSettingByKey('filter');
    }

    get orderBy() {
        return this.orderBy_;
    }

    set orderBy(orderBy) {
        this.orderBy_ = orderBy;
        this.settings.setSetting('order', this.orderBy);
    }

    order(object1, object2) {
        if (this.orderBy.reverse) {
            return (object1[this.orderBy.name] > object2[this.orderBy.name]) ? 1 : -1;
        } else {
            return (object1[this.orderBy.name] > object2[this.orderBy.name]) ? -1 : 1;
        }
    }

    get filter() {
        return this.filter_;
    }

    set filter(filter) {
        this.filter_ = filter;
        this.settings.setSetting('filter', filter);
    }

    async getNotes() {
        let notes = await this.storage.getNotes()
        if (notes) {
            if (this.filter) {
                notes = notes.filter((note) => {
                    return !Boolean(note[this.filter]);
                });
            }
            if (this.orderBy) {
                notes.sort(this.order.bind(this));
            }
        }
        return notes || [];
    }

    async getNoteById(noteId) {
        return await this.storage.getNoteById(noteId);
    }

    async addNote(note) {
        return await this.storage.addNote(note);
    }

    async updateNote(noteId, changes) {
        return await this.storage.updateNote(noteId, changes);
    }

    async deleteNote(noteId) {
        return await this.storage.deleteNote(noteId);
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