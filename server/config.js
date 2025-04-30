import dotenv from "dotenv";

dotenv.config(); //retrieve the environment variables.
export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const CLIENT_URL = process.env.CLIENT_URL;