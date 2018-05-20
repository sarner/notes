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
    <nav>
        <div class="button-group">
            <button type="button" onclick="Notes_Main.newNote()">Create new note</button>
        </div>
        <div>
            <label for="style-selector">Choose style:</label>
            <select id="style-selector" onchange="Notes_Main.setStyle(this)">
                <option value="black-white">Black & white</option>
                <option value="colored">Color</option>
            </select>
        </div>
    </nav>
    <nav id="notes-interaction">
        <div class="button-group">
            <button type="button">By due date</button>
            <button type="button">By created date</button>
            <button type="button">By importance</button>
        </div>
        <div class="button-group">
            <button type="button">Show finished notes</button>
        </div>
    </nav>
    <section>
        {{#if (ifExpr count '>' '0')}}
            <ul class="notes-list">
                {{#each notes}}
                    {{> noteListItem date=../date }}
                {{/each}}
            </ul>
        {{else}}
            <div class="no-notes">No notes determined</div>
        {{/if}}
    </section>`
);

Handlebars.registerPartial(
    'noteListItem',
    `<li class="note-container">
        <div class="note-due-date">{{localeDateString dueDate}}</div>
        <div class="note-header">
            <div class="note-title">{{title}}</div>
            <div class="note-importance">
                <i class="fas fa-bolt fa-fw {{#if (ifExpr importance '<' '1')}}not-set{{/if}}" {{#if (ifExpr importance '===' '1')}}aria-label="Very low importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (ifExpr importance '<' '2')}}not-set{{/if}}" {{#if (ifExpr importance '===' '2')}}aria-label="Low importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (ifExpr importance '<' '3')}}not-set{{/if}}" {{#if (ifExpr importance '===' '3')}}aria-label="Normal importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (ifExpr importance '<' '4')}}not-set{{/if}}" {{#if (ifExpr importance '===' '4')}}aria-label="High importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (ifExpr importance '<' '5')}}not-set{{/if}}" {{#if (ifExpr importance '===' '5')}}aria-label="Very high importance"{{/if}}></i>
            </div>
        </div>
        <div class="note-due-state">
            <input id="note-finished-{{@index}}" type="checkbox"  onchange="Notes_Main.changeNoteState('{{creationDate}}', this.id)" {{#if done}} checked {{/if}} /><label for="note-finished">Finished {{#if (sameDate completionDate date)}}<span>[today]</span>{{/if}}</label>
        </div>
        <div class="note-description">
            <div>{{description}}</div>
            <button type="button"><i class="fas fa-angle-down"></i></button>
        </div>
        <div class="note-actions">
            <button onclick="Notes_Main.editNote('{{creationDate}}')">Edit</button>
            <button onclick="Notes_Main.deleteNote('{{creationDate}}')">Delete</button>
        </div>
    </li>`
);

Handlebars.registerPartial(
    'noteForm',
    `<form action="javascript:Notes_Main.saveNote()" method="POST">
        <div class="form-group">
            <label for="note-title">Title</label>
            <input id="note-title" name="note-title" type="text" placeholder="Title" value="{{title}}" required/>
            <div class="error-message">Title missing</div>
        </div>
        <div class="form-group">
            <label for="note-description">Description</label>
            <textarea id="note-description" name="note-description"  placeholder="Description" rows="3" required>{{description}}</textarea>
            <div class="error-message">Description missing</div>
        </div>
        <div class="form-group">
            <label for="note-importance">Importance</label>
            <div id="note-importance">
                <input id="very-low-importance" name="note-importance" type="radio" value="1" {{#if (ifExpr importance '===' '1')}}checked="checked"{{/if}} /><label for="very-low-importance"><i class="fas fa-bolt fa-fw" aria-label="Very low importance"></i></label>
                <input id="low-importance" name="note-importance" type="radio" value="2" {{#if (ifExpr importance '===' '2')}}checked="checked"{{/if}} /><label for="low-importance"><i class="fas fa-bolt fa-fw" aria-label="Low importance"></i></label>
                <input id="normal-importance" name="note-importance" type="radio" value="3" {{#if (ifExpr importance '===' '3')}}checked="checked"{{/if}} /><label for="normal-importance"><i class="fas fa-bolt fa-fw" aria-label="Normal importance"></i></label>
                <input id="high-importance" name="note-importance" type="radio" value="4" {{#if (ifExpr importance '===' '4')}}checked="checked"{{/if}} /><label for="high-importance"><i class="fas fa-bolt fa-fw not-set" aria-label="High importance"></i></label>
                <input id="very-high-importance" name="note-importance" type="radio" value="5" {{#if (ifExpr importance '===' '5')}}checked="checked"{{/if}} /><label for="very-high-importance"><i class="fas fa-bolt fa-fw not-set" aria-label="Very high importance"></i></label>
            </div>
            <div class="error-message">Please set an importance</div>
        </div>
        <div class="form-group">
            <label for="note-due-date">Due date</label>
            <input id="note-due-date" name="note-due-date" type="date" value="{{dueDate}}" required/>
            <div  class="error-message">Please select a date</div>
        </div>
        <input id="note-state" name="note-state" type="checkbox" value="{{done}}" hidden />
        <input id="note-creation-date" name="note-creation-date" type="datetime-local" value="{{creationDate}}" hidden />
        <div class="form-actions">
            <!-- TODO: disable save button when form invalid or empty -->
            <button type="submit">Save</button>
            <button type="reset">Reset</button>
            <button type="reset" onclick="Notes_Main.showNotesList()">Back</button>
        </div>
    </form>`
)