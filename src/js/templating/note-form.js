'use strict';

Handlebars.registerPartial(
    'noteForm',
    `<form class="form" id="js-note-form" method="POST" role="form">
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="js-note-title">Title</label>
            <input class="form-group__field"
                id="js-note-title"
                name="note-title"
                type="text"
                placeholder="Title"
                value="{{note.title}}"
                required />
            <div class="form-group__error form-group__error--hidden" role="alert">Title missing</div>
        </div>
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="js-note-description">Description</label>
            <textarea class="form-group__field"
                id="js-note-description"
                name="note-description"
                role="textbox"
                placeholder="Description"
                rows="3"
                required>
                {{~note.description~}}
            </textarea>
            <div class="form-group__error form-group__error--hidden" role="alert">Description missing</div>
        </div>
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="js-note-importance">Importance</label>
            <div class="form-group__field radio-group" id="js-note-importance" role="radiogroup">
                {{#each importanceOptions}}
                    <input class="radio-group__item--hidden"
                        id="{{id}}"
                        name="note-importance"
                        type="radio"
                        role="radio"
                        value="{{value}}"
                        {{#if (expr ../note.importance '===' value)}}
                            checked="checked" aria-checked="true"
                        {{else}}
                            aria-checked="false"
                        {{/if}} />
                    <label class="radio-group__symbol" for="{{id}}">
                        <i class="fas fa-bolt fa-fw" aria-label="{{description}}"></i>
                    </label>
                {{/each}}
            </div>
            <div class="form-group__error form-group__error--hidden" role="alert">Please set an importance</div>
        </div>
        <div class="form__item--clearance form-group form-group--size-middle" role="group">
            <label class="form-group__label" for="js-note-due-date">Due date</label>
            <input class="form-group__field"
                id="js-note-due-date"
                name="note-due-date"
                type="date"
                value="{{note.dueDate}}"
                required />
            <div  class="form-group__error form-group__error--hidden" role="alert">Please select a date</div>
        </div>
        <div class="form__item--clearance" role="menu">
            <button class="button" type="submit" role="button">Save</button>
            <button class="button" type="reset" role="button">Reset</button>
            <button id="js-show-notes" class="button" type="reset" role="button">Back</button>
        </div>
    </form>`
);