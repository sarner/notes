/**************************************
 * Partials module
 **************************************/

'use strict';


/**
 * Notes_partials
 *
 * This module is responsible for providing
 * the partials used with handlebars.
 */
Handlebars.registerPartial(
    'notesList',
    `<div class="notes-count">#{{count}}</div>
    <nav role="navigation">
        <div class="button-group">
            <button type="button" onclick="Notes_Main.newNote()" role="button">Create new note</button>
        </div>
        <div>
            <label for="style-selector">Choose style:</label>
            <select id="style-selector" onchange="Notes_Main.setStyle(this.value)" role="listbox">
                <option value="black-white" role="option">Black & white</option>
                <option value="colored" role="option">Color</option>
            </select>
        </div>
    </nav>
    <nav id="notes-interaction" role="navigation">
        <div class="button-group" role="menu">
            {{#each sorting}}
                <button type="button" role="button"
                    onclick="{{fnc}}"
                    {{#if (expr ../sort.field '===' name)}}aria-checked="true"{{/if}}>
                    {{description}}
                    <i class="fas {{#if (expr ../sort.field '===' name)}}{{#if ../sort.reverse}}fa-sort-up{{else}}fa-sort-down{{/if}}{{else}}fa-sort{{/if}} fa-fw" aria-hidden="true"></i>
                </button>
            {{/each}}
        </div>
        <div class="button-group" role="menu">
            <button type="button" onclick="Notes_Main.filterFinishedNotes()" role="button" {{#if filter}}aria-checked="true"{{/if}}>Show finished notes</button>
        </div>
    </nav>
    <section role="section">
        {{#if (expr count '>' '0')}}
            <ul class="notes-list" role="list">
                {{#each notes}}
                    {{> noteListItem date=../date }}
                {{/each}}
            </ul>
        {{else}}
            <div class="no-notes" role="alert">No notes determined</div>
        {{/if}}
    </section>`
);

Handlebars.registerPartial(
    'noteListItem',
    `<li class="note-container" role="listitem">
        <div class="note-due-date"><time datetime="{{dueDate}}">{{localeDateString dueDate}}</time></div>
        <div class="note-header">
            <div class="note-title" role="heading">{{title}}</div>
            <div class="note-importance">
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '1')}}not-set{{/if}}" {{#if (expr importance '===' '1')}}aria-label="Very low importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '2')}}not-set{{/if}}" {{#if (expr importance '===' '2')}}aria-label="Low importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '3')}}not-set{{/if}}" {{#if (expr importance '===' '3')}}aria-label="Normal importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '4')}}not-set{{/if}}" {{#if (expr importance '===' '4')}}aria-label="High importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '5')}}not-set{{/if}}" {{#if (expr importance '===' '5')}}aria-label="Very high importance"{{/if}}></i>
            </div>
        </div>
        <div class="note-due-state">
            <input id="note-finished-{{@index}}" type="checkbox" onchange="Notes_Main.changeNoteState('{{creationDate}}', this.id)" {{#if done}} checked aria-checked="true" {{else}} aria-checked="false" {{/if}} role="checkbox" /><label for="note-finished">Finished {{#if (sameDate completionDate date)}}<span><time datetime="{{completionDate}}">[today]</time></span>{{/if}}</label>
        </div>
        <div class="note-description">
            <div>{{description}}</div>
            <button onclick="Notes_Main.toggleDescriptionDisplay(this, '{{creationDate}}')"><i class="fas fa-angle-down"></i></button>
        </div>
        <div class="note-actions" role="menu">
            <button type="button" onclick="Notes_Main.editNote('{{creationDate}}')" role="button">Edit</button>
            <button type="button" onclick="Notes_Main.deleteNote('{{creationDate}}')" role="button">Delete</button>
        </div>
    </li>`
);

Handlebars.registerPartial(
    'noteForm',
    `<form action="javascript:Notes_Main.saveNote()" method="POST" role="form">
        <div class="form-group" role="group">
            <label for="note-title">Title</label>
            <input id="note-title" name="note-title" type="text" placeholder="Title" value="{{title}}" required />
            <div class="error-message" role="alert">Title missing</div>
        </div>
        <div class="form-group" role="group">
            <label for="note-description">Description</label>
            <textarea id="note-description" name="note-description" placeholder="Description" rows="3" required role="textbox">{{description}}</textarea>
            <div class="error-message" role="alert">Description missing</div>
        </div>
        <div class="form-group" role="group">
            <label for="note-importance">Importance</label>
            <div id="note-importance" role="radiogroup">
                <input id="very-low-importance" name="note-importance" type="radio" value="1" {{#if (expr importance '===' '1')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label for="very-low-importance"><i class="fas fa-bolt fa-fw" aria-label="Very low importance"></i></label>
                <input id="low-importance" name="note-importance" type="radio" value="2" {{#if (expr importance '===' '2')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label for="low-importance"><i class="fas fa-bolt fa-fw" aria-label="Low importance"></i></label>
                <input id="normal-importance" name="note-importance" type="radio" value="3" {{#if (expr importance '===' '3')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label for="normal-importance"><i class="fas fa-bolt fa-fw" aria-label="Normal importance"></i></label>
                <input id="high-importance" name="note-importance" type="radio" value="4" {{#if (expr importance '===' '4')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label for="high-importance"><i class="fas fa-bolt fa-fw not-set" aria-label="High importance"></i></label>
                <input id="very-high-importance" name="note-importance" type="radio" value="5" {{#if (expr importance '===' '5')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label for="very-high-importance"><i class="fas fa-bolt fa-fw not-set" aria-label="Very high importance"></i></label>
            </div>
            <div class="error-message" role="alert">Please set an importance</div>
        </div>
        <div class="form-group" role="group">
            <label for="note-due-date">Due date</label>
            <input id="note-due-date" name="note-due-date" type="date" value="{{dueDate}}" required />
            <div  class="error-message" role="alert">Please select a date</div>
        </div>
        <input id="note-state" name="note-state" type="checkbox" value="{{done}}" {{#if done}} checked aria-checked="true" {{else}} aria-checked="false" {{/if}} hidden aria-hidden="true" />
        <input id="note-creation-date" name="note-creation-date" type="datetime-local" value="{{creationDate}}" hidden aria-hidden="true" />
        <div class="form-actions" role="menu">
            <button type="submit" role="button">Save</button>
            <button type="reset" role="button">Reset</button>
            <button type="reset" onclick="Notes_Main.showNotesList()" role="button">Back</button>
        </div>
    </form>`
)