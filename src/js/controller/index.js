'use strict';

import {default as initNotesList} from './list.js';
import '../model/number.js';
import '../model/date.js';
import '../model/array.js';
import '../templating/helper.js';

(function () {
    window.addEventListener('load', initNotesList);
}());