/*
 * Framework: Hashthis
 * Description: Gets the hash of any given data. Defaults to MD5 unless specified.
 */

const crypto = require('crypto');

module.exports = (data, algorithm) => {
    // If no algorithm is specificed, use MD5
    if (!algorithm) algorithm = 'md5';

    // Annnd... Hash this!
    return crypto.createHash(algorithm).update(data, 'utf8').digest('hex').toUpperCase();
};