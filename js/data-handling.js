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

    function log(level, functionName, message) {
        Notes_Logging.log(level, 'Notes_DataHandling', functionName + '(): ' + message);
    }

    function saveObject(key, item) {
        let objects = loadAllObjects(key);
        const storedItem = loadItem(key, item.creationDate);
        if ( storedItem === null ) {
            objects.push(item);
        } else {
            objects = objects.filter( (object) => { object.creationDate === item.creationDate ? item : object } );
        }
        localStorage.setItem(key, JSON.stringify(objects));
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
        save: saveObject,
        delete: deleteObject,
        loadAll: loadAllObjects,
        loadItem: loadItem
    };

})();