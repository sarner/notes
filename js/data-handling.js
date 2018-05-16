/**************************************
 * Data handling module
 **************************************/

'use strict';


/**
 * Notes_DataHandling
 *
 * This module is responsible for providing
 * the data handling functionality of the notes app.
 */

let Notes_DataHandling = (function () {

    function log(level, functionName, message) {
        Notes_Logging.log(level, 'Notes_DataHandling', functionName + '(): ' + message);
    }

    function saveAllObjects(key, objects) {
        localStorage.setItem(key, JSON.stringify(objects));
    }

    function saveItem(key, item) {
        let objects = loadAllObjects(key);
        const storedItem = loadItem(key, item.creationDate);
        if ( storedItem === null ) {
            objects.push(item);
        } else {
            for ( let i = 0; i < objects.length; i++ ) {
                if (objects[i].creationDate === item.creationDate) {
                    objects[i] = item;
                }
            }
        }
        saveAllObjects(key, objects);
    }

    function deleteAllObjects(key) {
        localStorage.removeItem(key);
    }

    function deleteItem(key, date) {
        const objects = loadAllObjects(key);
        const results = objects.filter( (item) => { return item.creationDate !== date } );
        saveAllObjects(key, results);
    }

    function loadAllObjects(key) {
        if (localStorage.getItem(key) !== null) {
            return JSON.parse(localStorage.getItem(key));
        } else {
            return [];
        }
    }

    function loadItem(key, date) {
        const objects = loadAllObjects(key);
        const results = objects.filter( (item) => { return item.creationDate === date } );
        try {
            if ( results.length === 0) { throw 'No' }
            if ( results.length > 1 ) { throw 'Too many' }
        }
        catch (e) {
            log('warning', 'loadItem', e + ' results!');
            return null;
        }
        return results[0];
    }

    return {
        saveAll: saveAllObjects,
        saveItem: saveItem,
        deleteAll: deleteAllObjects,
        deleteItem: deleteItem,
        loadAll: loadAllObjects,
        loadItem: loadItem
    };

})();