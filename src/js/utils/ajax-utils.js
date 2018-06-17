'use strict';

class AjaxUtil {

    sendRequest(method, url, data, headers) {
        return fetch(url, {
            method: method,
            headers: headers,
            body: JSON.stringify(data)
        }).then(response => response.json());
    }

}

export default AjaxUtil;