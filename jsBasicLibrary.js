/**
 *  It will help us to do default values format .....
 * 
 */

const _defaultMaxSingleDigitValue = 9;
const _monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const _defaultDateFormat = 'MDY';
const _defaultDateSplitter = '/';
const _defaultTimeSplitter = ':';

/** 
 * It will help us to create or update our local storage
 */
function createOrUpdateMyLocalStorage(keyName, value) {
    if (localStorage.getItem(keyName)) {
        removeOrDeleteMyLocalStorage(keyName);
    }
    localStorage.setItem(keyName, value);
}
/**
 * It will help us to remove an item from our local storage
*/
function removeOrDeleteMyLocalStorage(keyName) {
    localStorage.removeItem(keyName);
}
/**
 * It will help us to clear our local storage
*/
function clearAllMyLocalStorages() {
    localStorage.clear();
}
function paddingValue(value, defaultMinValue, padValue = "0") {
    if (!value && !defaultMinValue)
        return "Value Need for the operation";

    if (value > defaultMinValue)
        return value;
    else {
        let paddingValue = '';
        let loopLength = defaultMinValue.toString().length - (value.toString().length - 1);
        for (var i = 0; i < loopLength; i++)
            paddingValue += `${padValue}`;

        return `${paddingValue}${value}`;
    }
}
function dateFormatAsMonthDateYear(value, spliter = _defaultDateSplitter) {
    let valueToFormat = new Date(value);
    let dateOfDate = valueToFormat.getDate();
    let monthOfDate = valueToFormat.getMonth() + 1;
    let yearOfDate = valueToFormat.getFullYear();
    let monthPadded = paddingValue(monthOfDate, _defaultMaxSingleDigitValue, 0);

    return `${monthPadded}${spliter}${dateOfDate}${spliter}${yearOfDate}`;
}
function dateFormatAsMonthDateYearWithFormatter(value, formatter = _defaultDateFormat, spliter = _defaultDateSplitter) {
    let valueToFormat = new Date(value);
    let dateOfDate = valueToFormat.getDate();
    let monthOfDate = valueToFormat.getMonth() + 1;
    let yearOfDate = valueToFormat.getFullYear();
    let monthPadded = paddingValue(monthOfDate, _defaultMaxSingleDigitValue, 0);
    let datePadded = paddingValue(dateOfDate, _defaultMaxSingleDigitValue, 0);
    let finalResult = '';
    for (var i = 0; i < formatter.length; i++) {
        switch (formatter[i].toLocaleUpperCase()) {
            case 'M':
                if (finalResult)
                    finalResult += `${spliter}${monthPadded}`;
                else
                    finalResult += `${monthPadded}`;
                break;
            case 'D':
                if (finalResult)
                    finalResult += `${spliter}${datePadded}`;
                else
                    finalResult += `${datePadded}`;
                break;
            case 'Y':
                if (finalResult)
                    finalResult += `${spliter}${yearOfDate}`;
                else
                    finalResult += `${yearOfDate}`;
                break;
        }
    }
    return finalResult;
}
function dateFormatAsMonthNameDateYearWithFormatter(value, formatter = _defaultDateFormat, spliter = _defaultDateSplitter) {
    let valueToFormat = new Date(value);
    let dateOfDate = valueToFormat.getDate();
    let monthOfDate = valueToFormat.getMonth();
    let yearOfDate = valueToFormat.getFullYear();
    let datePadded = paddingValue(dateOfDate, _defaultMaxSingleDigitValue, 0);
    let finalResult = '';
    let isMonthAddedFirst = false;
    for (var i = 0; i < formatter.length; i++) {
        switch (formatter[i].toLocaleUpperCase()) {
            case 'M':
                if (!finalResult)
                    isMonthAddedFirst = true;
                finalResult += ` ${_monthNames[monthOfDate]} `;
                break;
            case 'D':
                if (finalResult && !isMonthAddedFirst)
                    finalResult += `${spliter}${datePadded}`;
                else {
                    finalResult += `${datePadded}`;
                    isMonthAddedFirst = false;
                }
                break;
            case 'Y':
                if (finalResult && !isMonthAddedFirst)
                    finalResult += `${spliter}${yearOfDate}`;
                else {
                    finalResult += `${yearOfDate}`;
                    isMonthAddedFirst = false;
                }
                break;
        }
    }
    return finalResult ? finalResult : 'Value has error, Please recheck the value once again.';
}
function dateFormatAsMonthDateYearWithHourMinSec24Format(value, monthspliter = _defaultDateSplitter, timeSplitter = _defaultTimeSplitter) {

    let valueToFormat = new Date(value);

    let hour = paddingValue(valueToFormat.getHours(), 9);
    let min = paddingValue(valueToFormat.getMinutes(), 9);
    let secs = paddingValue(valueToFormat.getSeconds(), 9);

    return `${dateFormatAsMonthDateYear(value)} ${hour}${timeSplitter}${min}${timeSplitter}${secs}`;
}
function dateFormatAsMonthDateYearWithHourMinSec12Format(value, monthspliter = _defaultDateSplitter, timeSplitter = _defaultTimeSplitter) {

    let valueToFormat = new Date(value);
    let hourCorssed = false;
    let hour = paddingValue(valueToFormat.getHours(), 9);
    hourCorssed = hour > 12;
    hour = hour > 12 ? `${paddingValue(hour - 12, _defaultMaxSingleDigitValue)}` : `${hour}`;
    let min = paddingValue(valueToFormat.getMinutes(), 9);
    let secs = paddingValue(valueToFormat.getSeconds(), 9);

    return `${dateFormatAsMonthDateYear(value)} ${hour}${timeSplitter}${min}${timeSplitter}${secs} ${hourCorssed ? 'PM' : 'AM'}`;
}

/**
 * 
 * @param {*} input as Date or String Content of Date as Valid one
 * @param {*} timeZone System Time Zone or User Provided Time Zone
 * @returns String Format of Date With Time 
 */
function dateUtcToLocalYourTimeZone(input, timeZone) {
    if (input) {
        input = new Date(input + 'z');
        return input.toLocaleString('en-US', { timeZone });
    }
    return "Please provide validate input.";
}

/**
 * 
 * @param {*} input as Date or String Content of Date as Valid one
 * @returns String Format of Date With Time 
 */
function dateUtcToLocalBrowserTimeZone(input) {
    if (input) {
        input = new Date(input);
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return dateUtcToLocalYourTimeZone(input, timeZone);
    }
    return "Please provide validate input.";
}

/**
 * 
 * @param {*} input  as Date or String Content of Date as Valid one
 * @param {*} timeZone System Time Zone or User Provided Time Zone
 * @returns String Format of Date Part Alone
 */
function dateUtcToLocalYourTimeZoneWithDatePartAlone(input, timeZone) {
    if (input) {
        input = new Date(input + 'z');
        return input.toLocaleString('en-US', { timeZone }).split(',')[0];
    }
    return "Please provide validate input.";
}

/**
 * 
 * @param {*} input  as Date or String Content of Date as Valid one
 * @returns String Format of Date Part Alone
 */

function dateUtcToLocalBrowserTimeZoneWithDatePartAlone(input) {
    if (input) {
        return dateUtcToLocalBrowserTimeZone(input).split(',')[0];
    }
    return "Please provide validate input.";
}

/**
 * Date Format as UTC
 * Date Compare
 * Date Compare as UTC
 * Date Convert based on Timezone
 * Console Log
 * Form / Page Validation
 *  -> Required
 *  -> Format
 *  -> Range Validaiton
 *  -> 
 * 
 * Token Verify
 *  
 */