import fs from "fs";
import dotenv from "dotenv";

export const loadEnv = (envPath = "./.env") => {
  if (!fs.existsSync(envPath)) {
    throw new Error(`Env file : "${envPath}" not found.`);
  }

  dotenv.config({
    path: envPath,
  });
};
