'use strict';

import {default as SettingsService} from '../services/settings-storage.js';

class StyleService {
    constructor () {
        this.settings = new SettingsService();
        this.bodyElement = document.body;
        this.style = this.settings.getSettingByKey('style') || 'black-white';
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