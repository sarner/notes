'use strict';

Handlebars.registerPartial(
    'notesInteraction',
    `<nav class="notes__interaction flex-container flex-container--space-between" role="navigation">
        <div id="js-notes-ordering" class="flex-container__item" role="menu">
            {{#each orderOptions}}
                <button class="button" type="button" role="button" 
                    data-order-by="{{name}}"
                    {{~#if (expr ../orderBy.name '===' name)~}}
                        data-order-reverse="{{../orderBy.reverse}}"
                        aria-checked="true"
                    {{~/if~}}>
                    {{~description~}}
                    <i class="{{~#if (expr ../orderBy.name '===' name)~}}
                                {{~#if ../orderBy.reverse~}}
                                    fas fa-sort-up fa-fw
                                {{~else~}}
                                    fas fa-sort-down fa-fw
                                {{~/if~}}
                            {{~else~}}
                                fas fa-sort fa-fw
                            {{~/if~}}"
                        aria-hidden="true"></i>
                </button>
            {{/each}}
        </div>
        <div id="js-notes-filtering" class="flex-container__item" role="menu">
            {{#each filterOptions}}
                <button class="button" type="button" role="button"
                    data-filter="{{name}}"
                    {{#if (expr ../filter '===' name)}}aria-checked="true"{{/if}}>
                    {{~description~}}
                </button>
            {{/each}}
        </div>
    </nav>`
);