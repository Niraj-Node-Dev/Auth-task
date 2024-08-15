import * as dotenv from 'dotenv';
dotenv.config();

export class EnvError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export const getEnv = (name: string, def = ''): string => {
    const upperName = name.toUpperCase();
    const env = process.env[upperName] ?? def;
    if (!env) {
        throw new EnvError(`in env file '${upperName}' not found.`);
    }
    return env;
};


export const APP_NAME = getEnv('APP_NAME');
export const SWAGGER_DOC_ENDPOINT = getEnv('SWAGGER_DOC_ENDPOINT');
export const HOST = getEnv('HOST');
export const PORT = getEnv('PORT');

export const DB_HOST = getEnv('DB_HOST');
export const DB_PORT = getEnv('DB_PORT');
export const DB_PASSWORD = getEnv('DB_PASSWORD');
export const DB_USERNAME = getEnv('DB_USERNAME');
export const DB_NAME = getEnv('DB_NAME');


export const JWT_SALT = getEnv('JWT_SALT', 'secret');
export const JWT_EXPIRES = getEnv('JWT_EXPIRES', '10000');

export const MAIL_USERNAME = getEnv('MAIL_USERNAME')
export const MAIL_PASSWORD = getEnv('MAIL_PASSWORD')
export const VERIFY_EMAIL_URL= getEnv('VERIFY_EMAIL_URL','http://localhost:7000')
