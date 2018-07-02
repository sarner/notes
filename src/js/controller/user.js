'use strict';

import {authentication} from '../services/authentication.js';
import {default as EventHandler} from './event.js';

class RegistrationCtrl {

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
            'js-registration-form',
            'submit',
            this.handleRegistration.bind(this)
        );
        this.formEventHandler.addListener(
            'js-registration-form',
            'input',
            this.handleInvalidForm.bind(this)
        );
        this.formEventHandler.addListener(
            'js-registration-form',
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
        if (document.getElementById('js-registration-password').value !== document.getElementById('js-registration-password-confirm').value) {
            errorElement.classList.remove('form-group__error--hidden');
        } else {
            errorElement.classList.add('form-group__error--hidden');
        }
    }

    async handleRegistration(event) {
        event.preventDefault();
        const username = document.getElementById('js-registration-username').value;
        const email = document.getElementById('js-registration-email').value;
        const password = document.getElementById('js-registration-password').value;
        const passwordConfirm = document.getElementById('js-registration-password-confirm').value;

        if (password === passwordConfirm) {
            await authentication.register(username, email, password);
            this.handleShowNotes();
        } else {
            const errorMessage = document.getElementById('js-registration-password-confirm').closest('.form-group__error');
            errorMessage.classList.remove('form-group__error--hidden');
        }
    }

    handleShowNotes() {
        if (!authentication.isLoggedIn()) {
            return false;
        }
        this.formEventHandler.unregisterEvents();
        window.location.assign('/');
    }

}

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

export function initRegistration() {
    new RegistrationCtrl();
};

export function initLogin() {
    new LoginCtrl();
};