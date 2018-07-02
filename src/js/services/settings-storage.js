'use strict';

class SettingsStorage {

    getSettingByKey(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setSetting(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    deleteSetting(key) {
        localStorage.removeItem(key);
    }

}

export const settingsStorage = new SettingsStorage();