'use strict';

class SettingsStorage {

    getSettingByKey(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    setSetting(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

}

export const settingsStorage = new SettingsStorage();