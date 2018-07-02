'use strict';

import crypto from 'crypto';

class CryptoUtil {
    static hashPassword(pwd) {
        /* TODO: The secret should be in a (unversioned) config file or better be a private key or set as an environment variable*/
        const hmacSecret = 'jQfäcyj+VaMvZG@Dj#gXbTz<Guj6p§ä{Q==V<?VXFjZsÜ:öBt6,HdMAmG~WäÖmHä';
        return crypto.createHmac('sha256', hmacSecret)
            .update(pwd)
            .digest('hex');
    }
}

export default CryptoUtil;