/**
 * Add zero in front of numbers < 10
 * @param {int} number
 * @returns {string}
 */
export function zeroPad(number) {
    let str = number.toString();
    if (number < 10) {
        str = '0' + str;
    }
    return str;
}

/**
 * Add separator to make number more readable e.g. comma after thousands
 * @param {int} number
 * @param {int} formatSize
 * @param {string} separator
 * @returns {string}
 */
export function formatNumber(number, formatSize = 3, separator = ',') {
    let str = number.toString();
    if (str.length > formatSize) {
        let firstPart = str.slice(0, str.length - formatSize);
        let secondPart = str.slice(str.length - formatSize);
        return firstPart + separator + secondPart;
    }
    return str;
}
