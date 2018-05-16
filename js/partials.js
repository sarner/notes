/**************************************
 * Partials module
 **************************************/

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
            <div class="note-due-date">{{dueDate}}</div>
            <div class="note-header">
                <div class="note-title">{{title}}</div>
                <div class="note-importance">
                    <i class="fas fa-bolt fa-fw" aria-label="Very low importance"></i>
                    <i class="fas fa-bolt fa-fw" aria-label="Low importance"></i>
                    <i class="fas fa-bolt fa-fw" aria-label="Normal importance"></i>
                    <i class="fas fa-bolt fa-fw not-set" aria-label="High importance"></i>
                    <i class="fas fa-bolt fa-fw not-set" aria-label="Very high importance"></i>
                </div>
            </div>
            <div class="note-due-state">
                <input id="note-finished" type="checkbox" /><label for="note-finished">Finished<span> [today]</span></label>
            </div>
            <div class="note-description">
                <div>{{description}}</div>
                <button type="button"><i class="fas fa-angle-down"></i></button>
            </div>
            <div class="note-actions">
                <button onclick="Notes_Main.editNote({{creationDate}})">Edit</button>
            </div>
        </div>
    </li>`
);