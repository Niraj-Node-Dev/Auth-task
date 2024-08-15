import { compare, genSaltSync, hash } from 'bcrypt';
import { JWT_EXPIRES, JWT_SALT } from 'config';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

export async function comparePassword(plainPassword: string, passwordhash: string) {
    const isMatched = await compare(plainPassword, passwordhash);
    return isMatched;
}

export async function generateSalt(round = 10) {
    return genSaltSync(round);
}

export async function generateSaltAndHash(userPassword: string): Promise<{
    salt: string;
    passwordHash: string;
}> {
    const salt = await generateSalt();
    const passwordHash: string = (await makeHash(userPassword, salt)) as string;
    return {
        salt,
        passwordHash,
    };
}

export async function makeHash(plainPassword: string, salt: string): Promise<string | null> {
    return await hash(plainPassword, salt);
}

export const jwtSign = (data: object) => {
    return jwt.sign(data, JWT_SALT, {
        algorithm: 'HS256',
        expiresIn: parseInt(JWT_EXPIRES) * 1000, // unix seconds
    });
};


export const generateOtp = (length: number) => {
    if (length <= 0) {
        throw new Error('Length must be greater than 0');
    }

    const bytes = crypto.randomBytes(Math.ceil(length / 2));
    const otp = bytes
        .toString('hex')
        .slice(0, length)
        .split('')
        .map((char) => parseInt(char, 16)) // Convert hex to decimal
        .join('')
        .slice(0, length);

    return otp;
};