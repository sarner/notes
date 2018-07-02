'use strict';

import SecurityUtil from '../utils/security';

class UsersCtrl {

    async register(request, response) {
        await SecurityUtil.handleRegistration(request, response);
    }

    async login(request, response) {
        await SecurityUtil.handleLogin(request, response);
    }

}

export const usersCtrl = new UsersCtrl();