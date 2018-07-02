'use strict';

import Datastorage from 'nedb-promise';
import CryptoUtil from '../utils/crypto';

class User {
    constructor (username, email, password) {
        this.username = username;
        this.email = email;
        this.passwordHash = CryptoUtil.hashPassword(password);
        if (typeof this.active === undefined) {
            this.active = true;
        }
    }
}

class UserStorage {

    constructor (db) {
        this.db = db || new Datastorage({filename: './data/users.db', autoload: true});
    }

    async getUsersByUsername(username) {
        return await this.db.find({username: username});
    }

    async getUserByUsername(username) {
        return await this.db.findOne({username: username});
    }

    async register(username, email, password) {
        if (!(username && email && password)) {
            throw new Error('Could not register user');
        }
        if (await this.getUsersByUsername(username).length > 0) {
            throw new Error('Username already in use');
        }
        const user = new User(username, email, password);
        return await this.db.insert(user);
    }

    async changePassword(username, oldPwd, newPwd) {
        const user = await this.getUserByUsername(username);
        if (user.passwordHash !== CryptoUtil.hashPassword(oldPwd)) {
            throw new Error('Could not authenticate user');
        }
        return await this.db.update({_id: user.id}, {$set: {password: CryptoUtil.hashPassword(newPwd)}});
    }

    async delete(username) {
        return await this.db.update({username: username}, {$set: {'active': false}});
    }

    async authenticate(username, password) {
        if (!(username && password)) {
            throw new Error('No credentials');
        }
        const user = await this.getUserByUsername(username);
        if (user === null) {
            return false;
        } else {
            return user.passwordHash === CryptoUtil.hashPassword(password);
        }
    }

}

export const userStorage = new UserStorage();