'use strict';

import {authentication} from '../services/authentication.js';
import {default as EventHandler} from './event.js';

class LoginCtrl {

    constructor () {
        this.initEventHandlers();
        this.initListeners();
        this.formEventHandler.registerEvents();
    }

    initEventHandlers() {
        this.formEventHandler = new EventHandler();
    }

    initListeners() {
        this.formEventHandler.addListener(
            'js-login-form',
            'submit',
            this.handleLogin.bind(this)
        );
        this.formEventHandler.addListener(
            'js-login-form',
            'input',
            this.handleInvalidForm.bind(this)
        );
        this.formEventHandler.addListener(
            'js-login-form',
            'focusout',
            this.handleInvalidForm.bind(this)
        );
    }

    handleInvalidForm(event) {
        const element = event.target.closest('.js-validate');
        if (event.target.closest('.js-validate') === null ) {
            return false;
        }
        const errorElement = element.nextElementSibling;
        if (element.checkValidity()) {
            errorElement.classList.add('form-group__error--hidden');
        } else {
            errorElement.classList.remove('form-group__error--hidden');
        }
    }

    async handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('js-login-username').value;
        const password = document.getElementById('js-login-password').value;
        await authentication.login(username, password);
        this.handleShowNotes();
    }

    handleShowNotes() {
        const errorMessage = document.getElementById('js-login-failed');
        if (!authentication.isLoggedIn()) {
            errorMessage.classList.remove('form-group__error--hidden');
            return false;
        } else {
            errorMessage.classList.add('form-group__error--hidden');
        }
        this.formEventHandler.unregisterEvents();
        window.location.assign('/');
    }

}

function init() {
    new LoginCtrl();
}

window.addEventListener('load', init);