'use strict';

import jwt from 'jsonwebtoken';
import {userStorage} from '../services/user-storage';
import util from 'util';

const jwtSign = util.promisify(jwt.sign);

class SecurityUtil {

    static currentUser(request) {
        return request.user.name;
    }

    static async createSessionToken(name, secret, options) {
        if (!(name && secret)) {
            return '';
        }
        return await jwtSign({name}, secret, options);
    }

    static async handleRegistration(request, response) {
        await userStorage.register(request.body.username, request.body.email, request.body.password);
        await this.handleLogin(request, response);
    }

    static async handleLogin(request, response) {
        if (await userStorage.authenticate(request.body.username, request.body.password)) {
            const token = await this.createSessionToken(request.body.username, request.app.get('jwt-secret'), request.app.get('jwt-sign'));
            response.json(token);
        } else {
            response.status(401).json(false);
        }
    }

}

export default SecurityUtil;