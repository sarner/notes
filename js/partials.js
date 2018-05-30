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
    `<div class="notes">
        <div class="notes__count">#{{count}}</div>
        <nav class="notes__navigation flex-container flex-container--space-between" role="navigation">
            <div class="flex-container__item">
                <button class="button" type="button" onclick="Notes_Main.newNote()" role="button">Create new note</button>
            </div>
            <div class="flex-container__item">
                <label for="style-selector">Choose style:</label>
                <select class="button" id="style-selector" onchange="Notes_Main.setStyle(this.value)" role="listbox">
                    <option value="black-white" role="option">Black & white</option>
                    <option value="colored" role="option">Color</option>
                </select>
            </div>
        </nav>
        <nav class="notes__interaction flex-container flex-container--space-between" role="navigation">
            <div class="flex-container__item" role="menu">
                {{#each sorting}}
                    <button class="button" type="button" role="button"
                        onclick="Notes_Main.sort('{{name}}')"
                        {{#if (expr ../sort.field '===' name)}}aria-checked="true"{{/if}}>
                        {{description}}
                        <i class="fas {{#if (expr ../sort.field '===' name)}}{{#if ../sort.reverse}}fa-sort-up{{else}}fa-sort-down{{/if}}{{else}}fa-sort{{/if}} fa-fw" aria-hidden="true"></i>
                    </button>
                {{/each}}
            </div>
            <div class="flex-container__item" role="menu">
                <button class="button" type="button" onclick="Notes_Main.filterFinishedNotes()" role="button" {{#if filter}}aria-checked="true"{{/if}}>Show finished notes</button>
            </div>
        </nav>
        <section class="notes__list" role="section">
            {{#if (expr count '>' '0')}}
                <ul class="notes-list" role="list">
                    {{#each notes}}
                        {{> noteListItem date=../date }}
                    {{/each}}
                </ul>
            {{else}}
                <div class="notes-list--empty" role="alert">No notes determined</div>
            {{/if}}
        </section>
    </div>`
);

Handlebars.registerPartial(
    'noteListItem',
    `<li class="notes-list__item note" role="listitem">
        <div class="note__due-date"><time datetime="{{dueDate}}">{{localeDateString dueDate}}</time></div>
        <div class="note__header flex-container flex-container--space-between">
            <div class="note__title" role="heading">{{title}}</div>
            <div class="note__importance">
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '1')}}note__importance--not-set{{/if}}" {{#if (expr importance '===' '1')}}aria-label="Very low importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '2')}}note__importance--not-set{{/if}}" {{#if (expr importance '===' '2')}}aria-label="Low importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '3')}}note__importance--not-set{{/if}}" {{#if (expr importance '===' '3')}}aria-label="Normal importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '4')}}note__importance--not-set{{/if}}" {{#if (expr importance '===' '4')}}aria-label="High importance"{{/if}}></i>
                <i class="fas fa-bolt fa-fw {{#if (expr importance '<' '5')}}note__importance--not-set{{/if}}" {{#if (expr importance '===' '5')}}aria-label="Very high importance"{{/if}}></i>
            </div>
        </div>
        <div class="note__state">
            <input id="note-finished-{{@index}}" class="text-align-middle" type="checkbox" onchange="Notes_Main.changeNoteState('{{creationDate}}', this.id)" {{#if done}} checked aria-checked="true" {{else}} aria-checked="false" {{/if}} role="checkbox" /><label class="text-align-middle" for="note-finished"> Finished {{#if (sameDate completionDate date)}}<span><time datetime="{{completionDate}}">[today]</time></span>{{/if}}</label>
        </div>
        <div class="note__description flex-container flex-container--space-between flex-container--items-top text-box__text">
            <div class="text-box__text text-box__text--short">{{description}}</div>
            <button class="text-box__button" onclick="Notes_Main.toggleDescriptionDisplay(this, '{{creationDate}}')"><i class="fas fa-angle-down"></i></button>
        </div>
        <div class="note__actions flex-container flex-container--space-between flex-container--column" role="menu">
            <button class="button" type="button" onclick="Notes_Main.editNote('{{creationDate}}')" role="button">Edit</button>
            <button class="button" type="button" onclick="Notes_Main.deleteNote('{{creationDate}}')" role="button">Delete</button>
        </div>
    </li>`
);

Handlebars.registerPartial(
    'noteForm',
    `<form class="form" action="javascript:Notes_Main.saveNote()" method="POST" role="form">
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="note-title">Title</label>
            <input class="form-group__field" id="note-title" name="note-title" type="text" placeholder="Title" value="{{title}}" required />
            <div class="form-group__error form-group__error--hidden" role="alert">Title missing</div>
        </div>
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="note-description">Description</label>
            <textarea class="form-group__field" id="note-description" name="note-description" placeholder="Description" rows="3" required role="textbox">{{description}}</textarea>
            <div class="form-group__error form-group__error--hidden" role="alert">Description missing</div>
        </div>
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="note-importance">Importance</label>
            <div class="form-group__field radio-group" id="note-importance" role="radiogroup">
                <input class="radio-group__item--hidden" id="very-low-importance" name="note-importance" type="radio" value="1" {{#if (expr importance '===' '1')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label class="radio-group__symbol" for="very-low-importance"><i class="fas fa-bolt fa-fw" aria-label="Very low importance"></i></label>
                <input class="radio-group__item--hidden" id="low-importance" name="note-importance" type="radio" value="2" {{#if (expr importance '===' '2')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label class="radio-group__symbol" for="low-importance"><i class="fas fa-bolt fa-fw" aria-label="Low importance"></i></label>
                <input class="radio-group__item--hidden" id="normal-importance" name="note-importance" type="radio" value="3" {{#if (expr importance '===' '3')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label class="radio-group__symbol" for="normal-importance"><i class="fas fa-bolt fa-fw" aria-label="Normal importance"></i></label>
                <input class="radio-group__item--hidden" id="high-importance" name="note-importance" type="radio" value="4" {{#if (expr importance '===' '4')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label class="radio-group__symbol" for="high-importance"><i class="fas fa-bolt fa-fw not-set" aria-label="High importance"></i></label>
                <input class="radio-group__item--hidden" id="very-high-importance" name="note-importance" type="radio" value="5" {{#if (expr importance '===' '5')}}checked="checked" aria-checked="true" {{else}} aria-checked="false" {{/if}} role="radio" /><label class="radio-group__symbol" for="very-high-importance"><i class="fas fa-bolt fa-fw not-set" aria-label="Very high importance"></i></label>
            </div>
            <div class="form-group__error form-group__error--hidden" role="alert">Please set an importance</div>
        </div>
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="note-due-date">Due date</label>
            <input class="form-group__field" id="note-due-date" name="note-due-date" type="date" value="{{dueDate}}" required />
            <div  class="form-group__error form-group__error--hidden" role="alert">Please select a date</div>
        </div>
        <input id="note-state" name="note-state" type="checkbox" value="{{done}}" {{#if done}} checked aria-checked="true" {{else}} aria-checked="false" {{/if}} hidden aria-hidden="true" />
        <input id="note-creation-date" name="note-creation-date" type="datetime-local" value="{{creationDate}}" hidden aria-hidden="true" />
        <div class="form__item--clearance" role="menu">
            <button class="button" type="submit" role="button">Save</button>
            <button class="button" type="reset" role="button">Reset</button>
            <button class="button" type="reset" onclick="Notes_Main.showNotesList()" role="button">Back</button>
        </div>
    </form>`
)