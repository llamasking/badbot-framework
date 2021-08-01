import * as crypto from 'crypto';

/**
 * Returns the hash of any given string. Defaults to md5 unless specified.
 * @param data The string to hash.
 * @param algorithm The hashing algorithm to use (defaults to md5 if not specified).
 * @returns The hash of `data` as a string.
 */
export function hashThis(data: string | Buffer, algorithm = 'md5'): string {
    if (data instanceof Buffer) data = data.toString();

    return crypto.createHash(algorithm).update(data, 'utf8').digest('hex').toUpperCase();
}
