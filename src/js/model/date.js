'use strict';

Date.prototype.toFormattedDateString = function () {
    const year = this.getFullYear();
    const month = this.getMonth().toTwoDigitsString();
    const day = this.getDate().toTwoDigitsString();
    return [year, month, day].join('-');
};