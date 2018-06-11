'use strict';

class SettingsService {
    constructor () {
    }

    getSettingByKey(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setSetting(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export default SettingsService;