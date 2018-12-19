'use strict';

import {ajax} from '../utils/ajax.js';
import {settingsStorage} from './settings-storage.js';

class Authentication {

    constructor () {
        this.tokenKey = 'token';
    }

    async register(username, email, password) {
        const token = await ajax.sendRequest(
            'POST',
            '/api/users/register',
            {
                username: username,
                email: email,
                password: password
            },
            {
                'Content-Type': 'application/json'
            }
        );
        settingsStorage.setSetting(this.tokenKey, token);
    }

    async login(username, password) {
        const token = await ajax.sendRequest(
            'POST',
            '/api/users/login',
            {
                username: username,
                password: password
            },
            {
                'Content-Type': 'application/json'
            }
        );
        settingsStorage.setSetting(this.tokenKey, token);
    }

    async logout() {
        settingsStorage.deleteSetting(this.tokenKey);
    }

    isLoggedIn() {
        return !!settingsStorage.getSettingByKey(this.tokenKey);
    }

}

export const authentication = new Authentication();