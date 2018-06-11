'use strict';

import {default as SettingsService} from '../data/settings-storage.js';

class StyleService {
    constructor (element) {
        this.settings = new SettingsService();
        this.bodyElement = document.body;
        this.style = this.settings.getSettingByKey('style') || 'black-white';
        this.styleSelectorElement = element;
        this.styleSelectorElement.value = this.style;
        this.styleSelectorElement.addEventListener('change', (event) => {this.style = event.target.value;});
    }

    get style()  {
        return this.style_;
    }

    set style(style) {
        this.style_ = style;
        this.settings.setSetting('style', this.style);
        this.updateUI();
    }

    updateUI() {
        this.bodyElement.classList = this.style;
    }
}

export default StyleService;