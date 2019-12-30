/*
// Framework: Hashthis
// Description: Gets the hash of any given data. Defaults to MD5 unless specified.
*/

module.exports = (data, algorithm) => {
    const crypto = require('crypto');

    if (!algorithm) algorithm = 'md5';
    return crypto.createHash(algorithm).update(data, 'utf8').digest('hex').toLocaleUpperCase();
};