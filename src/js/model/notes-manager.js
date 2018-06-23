'use strict';

import {settingsStorage} from '../services/settings-storage.js';
import {notesStorage} from '../services/notes-storage.js';

class NotesManager {

    constructor () {
        this.orderOptions = [
            new Order('dueDate', 'By due date'),
            new Order('importance', 'By importance'),
            new Order('creationDate', 'By creation date')
        ];
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
    }

    get orderBy() {
        return settingsStorage.getSettingByKey('order');
    }

    set orderBy(orderBy) {
        settingsStorage.setSetting('order', orderBy);
    }

    order(object1, object2) {
        const index = this.orderOptions.indexOfProperty('name', this.orderBy.name);
        const orderByArray = this.orderOptions.moveElementToFirstPosition(index);
        for (let i = 0; i < orderByArray.length; i++) {
            const item = orderByArray[i];
            const value1 = object1[item.name];
            const value2 = object2[item.name];
            if (value1 !== value2) {
                const lgt = value1 > value2 ? 1 : -1;
                if (i === 0) {
                    return this.orderBy.reverse ? lgt : lgt * -1;
                } else {
                    return lgt * -1;
                }
            }
        }
        return 0;
    }

    get filter() {
        return settingsStorage.getSettingByKey('filter');
    }

    set filter(filter) {
        settingsStorage.setSetting('filter', filter);
    }

    async getNotes() {
        let notes = await notesStorage.getNotes();
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
        return await notesStorage.getNoteById(noteId);
    }

    async addNote(note) {
        return await notesStorage.addNote(note);
    }

    async updateNote(noteId, changes) {
        return await notesStorage.updateNote(noteId, changes);
    }

    async deleteNote(noteId) {
        return await notesStorage.deleteNote(noteId);
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

export const notesMgr = new NotesManager();