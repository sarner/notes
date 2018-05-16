/**************************************
 * Data handling module
 **************************************/

/**
 * Notes_DataHandling
 *
 * This module is responsible for providing
 * the data handling functionality of the notes app.
 */

let Notes_DataHandling = (function () {

    function saveObject(key, object) {
        localStorage.setItem(key, JSON.stringify(object));
    }

    function deleteObject(key) {
        localStorage.removeItem(key);
    }

    function loadAllObjects(key) {
        if (localStorage.getItem(key) !== null) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return [];
        }
    }

    return {
        save: saveObject,
        delete: deleteObject,
        loadAll: loadAllObjects
    };

})();