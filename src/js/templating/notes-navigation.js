'use strict';

Handlebars.registerPartial(
    'notesNavigation',
    `<nav class="notes__navigation flex-container flex-container--space-between" role="navigation">
        <div class="flex-container__item">
            <button class="button" id="js-new-note" type="button" role="button">Create new note</button>
        </div>
        <div class="flex-container__item">
            <label for="style-selector">Choose style:</label>
            <select class="button" id="js-style-selector" role="listbox">
                <option value="black-white" role="option">Black & white</option>
                <option value="colored" role="option">Color</option>
            </select>
        </div>
    </nav>`
);