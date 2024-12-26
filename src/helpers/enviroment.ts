import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const APP_PORT = process.env.APP_PORT
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const JWT_SECRET = process.env.JWT_SECRET
export const INTERNAL_URL_DATABASE = process.env.INTERNAL_URL_DATABASE
export const CLOUDINARY_CLOUD_NAME= process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET
export const EMAIL_HOST = process.env.EMAIL_HOST
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
