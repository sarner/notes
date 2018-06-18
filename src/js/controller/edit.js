'use strict';

import {default as initNoteForm} from './form.js';
import '../templating/helper.js';

(function () {
    window.addEventListener('load', initNoteForm);
}());