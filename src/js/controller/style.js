'use strict';

import {settingsStorage} from '../services/settings-storage.js';

class StyleHandler {

    get style()  {
        return settingsStorage.getSettingByKey('style') || 'black-white';
    }

    set style(style) {
        settingsStorage.setSetting('style', style);
        this.updateUI();
    }

    updateUI() {
        document.body.classList = this.style;
    }

}

export const styleHandler = new StyleHandler();