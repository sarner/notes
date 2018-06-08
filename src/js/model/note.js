'use strict';

class Note {
    constructor (note) {
        this.creationDate = note.creationDate || new Date();
        this.title = note.title;
        this.description = note.description;
        this.importance = note.importance || 3;
        let defaultDueDate = new Date();
        defaultDueDate.setDate(defaultDueDate.getDate() + 7);
        this.dueDate = note.dueDate || defaultDueDate.toISOString().slice(0,10);
        this.completionDate = note.completionDate;
        this.completed = note.completed;
    }
}

export default Note;