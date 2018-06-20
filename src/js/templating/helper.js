'use strict';

Handlebars.registerHelper('replace', function (str, searchStr, replaceStr) {
    return str.replace(new RegExp(searchStr, 'g'), replaceStr);
});

Handlebars.registerHelper('expr', function (value1, operator, value2) {
    if ( !isNaN(Number(value1)) ) {
        value1 = Number(value1);
    }
    if ( !isNaN(Number(value2)) ) {
        value2 = Number(value2);
    }

    switch (operator) {
        case '===':
            return value1 === value2;
        case '!==':
            return value1 !== value2;
        case '||':
            return value1 || value2;
        case '&&':
            return value1 && value2;
        case '>':
            return value1 > value2;
        case '<':
            return value1 < value2;
        case '>=':
            return value1 >= value2;
        case '<=':
            return value1 <= value2;
    }
});

Handlebars.registerHelper('sameDate', function (date1, date2) {
    if ( date1 === null || date2 === null || typeof date1 === 'undefined' || typeof date2 === 'undefined' ) {
        return false;
    }
    const date1String = (new Date(date1)).toFormattedDateString();
    const date2String = (new Date(date2)).toFormattedDateString();
    return date1String === date2String;
});

Handlebars.registerHelper('localeDateString', function (date) {
   return (new Date(date)).toLocaleDateString();
});