'use strict';

Array.prototype.indexOfProperty = function (property, value) {
    let idx;
    this.forEach((item, index) => {
        if (item[property] === value) {
            idx = index;
        }
    });
    if (idx >= 0) {
        return idx;
    } else {
        return -1;
    }
};

Array.prototype.moveElementToFirstPosition = function (index) {
    const tmp = this[index];
    const firstSubArray = this.slice(0, index);
    const secondSubArray = this.slice(index + 1);
    return Array(tmp).concat(firstSubArray, secondSubArray);
};