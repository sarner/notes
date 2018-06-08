'use strict';

Handlebars.registerPartial(
    'notesList',
    `<section id="js-notes-list" class="notes__list" role="section">
        {{#if (expr count '>' '0')}}
            <ul class="notes-list" role="list">
                {{#each notes}}
                    {{> noteListItem date=../date importanceOptions=../importanceOptions}}
                {{/each}}
            </ul>
        {{else}}
            <div class="notes-list--empty" role="alert">No notes determined</div>
        {{/if}}
    </section>`
);

Handlebars.registerPartial(
    'noteListItem',
    `<li class="notes-list__item note" role="listitem">
        <div class="note__due-date"><time datetime="{{dueDate}}">{{localeDateString dueDate}}</time></div>
        <div class="note__header flex-container flex-container--space-between">
            <div class="note__title" role="heading">{{title}}</div>
            <div class="note__importance">
                {{#each importanceOptions}}
                    <i class="{{~#if (expr ../importance '<' value)~}}
                            fas fa-bolt fa-fw note__importance--not-set
                        {{~else~}}
                            fas fa-bolt fa-fw 
                        {{~/if~}}"
                        {{#if (expr ../importance '===' value)}}aria-label="{{description}}"{{/if}}>
                    </i>
                {{/each}}
            </div>
        </div>
        <div class="note__state">
            <input id="note-finished-{{@index}}"
                class="text-align-middle"
                type="checkbox"
                data-action="complete"
                data-note-id="{{creationDate}}"
                {{#if completed}}
                    checked aria-checked="true"
                {{else}}
                    aria-checked="false"
                {{/if}}
                role="checkbox" />
            <label class="text-align-middle" for="note-finished">
                <span> Finished</span>
                {{#if (sameDate completionDate date)}}
                    <span><time datetime="{{completionDate}}"> [today]</time></span>
                {{/if}}
            </label>
        </div>
        <div class="note__description flex-container flex-container--space-between flex-container--items-top text-box">
            <div class="text-box__text text-box__text--short">{{description}}</div>
            <button class="text-box__button" data-action="toggleTextBoxHeight"><i class="fas fa-angle-down"></i></button>
        </div>
        <div class="note__actions flex-container flex-container--space-between flex-container--column" role="menu">
            <button class="button" type="button" role="button"
                data-action="edit"
                data-note-id="{{creationDate}}">Edit</button>
            <button class="button" type="button" role="button"
                data-action="delete"
                data-note-id="{{creationDate}}">Delete</button>
        </div>
    </li>`
);