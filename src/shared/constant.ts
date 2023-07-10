import appRootPath from 'app-root-path';
import path from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const ROOT_PATH = appRootPath.path;
export const ASSETS_PATH = path.resolve(ROOT_PATH, 'assets');

export const ENVIRONMENT_TYPE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

export const ENVIRONMENT_NAME = {
  [ENVIRONMENT_TYPE.DEVELOPMENT]: {
    DB_USER: 'DB_USER_DEV',
    DB_PASSWORD: 'DB_PASSWORD_DEV',
    DB_HOST: 'DB_HOST_DEV',
    DB_NAME: 'DB_NAME_DEV',
    JWT_SECRET: 'JWT_SECRET_DEV',
    SALT_ROUND: 'SALT_ROUND_DEV',
    PORT: 'PORT_DEV',
  },
  [ENVIRONMENT_TYPE.PRODUCTION]: {
    DB_USER: 'DB_USER',
    DB_PASSWORD: 'DB_PASSWORD',
    DB_HOST: 'DB_HOST',
    DB_NAME: 'DB_NAME',
    JWT_SECRET: 'JWT_SECRET',
    SALT_ROUND: 'SALT_ROUND',
    PORT: 'PORT',
  },
  [ENVIRONMENT_TYPE.TEST]: {
    DB_USER: 'DB_USER_TEST',
    DB_PASSWORD: 'DB_PASSWORD_TEST',
    DB_HOST: 'DB_HOST_TEST',
    DB_NAME: 'DB_NAME_TEST',
    JWT_SECRET: 'JWT_SECRET_TEST',
    SALT_ROUND: 'SALT_ROUND_TEST',
    PORT: 'PORT_TEST',
  },
};

export const USER_ROLE = {
  ADMIN: 'admin',
  ANONYMOUS: 'anonymous',
  CHANNEL_MEMBER: 'channel_member',
  CHANNEL_MODERATOR: 'channel_moderator',
  GUEST: 'guest',
  USER: 'user',
} as const;

// --- SEQUELIZE SPECIFIC CONFIGURATION --- //

export const DB_CONFIG_KEY = {
  USERNAME: 'username',
  PASSWORD: 'password',
  DATABASE: 'database',
  HOST: 'host',
  DIALECT: 'dialect',
} as const;

export const DB_CONFIG_VALUE = {
  [DB_CONFIG_KEY.USERNAME]: 'DB_USER',
  [DB_CONFIG_KEY.PASSWORD]: 'DB_PASSWORD',
  [DB_CONFIG_KEY.DATABASE]: 'DB_NAME',
  [DB_CONFIG_KEY.HOST]: 'DB_HOST',
} as const;
