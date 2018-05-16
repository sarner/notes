/**************************************
 * Logging module
 **************************************/

'use strict';


/**
 * Notes_logging
 *
 * This module is responsible for providing
 * the logging functionality of the notes app.
 */

let Notes_Logging = (function () {
    
    function log(level, functionName, message) {
        if ( typeof level === 'string' && typeof functionName === 'string' && typeof message === 'string') {
            const MSG = functionName + ' --> ' + message;
            switch (level) {
                case 'debug':
                    console.log(MSG);
                    break;
                case 'info':
                    console.info(MSG);
                    break;
                case 'warning':
                    console.warn(MSG);
                    break;
                case 'error':
                    console.error(MSG);
                    break;
                default:
                    console.error('Notes_Logging: Illegal parameter level!');
            }
        } else {
            console.error('Notes_Logging: Illegal parameter value!');
        }
    }
    
    return {
        log: log
    };

})();


/**
 * Logging_initialize()
 *
 * Automatic initialisation of the logging module.
 */
(function Logging_initialize() {
    /* TODO: remove unnecessary logging */
    console.info('Notes_Logging: Module initialized');
})();