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

