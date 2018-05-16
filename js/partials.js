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
    'noteListItem',
    `<li>
        <div class="note-container">
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
            </div>
        </div>
    </li>`
);