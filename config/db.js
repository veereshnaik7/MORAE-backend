import { config } from "dotenv";
config();
let db = {};

if (process.env.NODE_ENV == "development") {
  db.MONGODB_URL = process.env.MONGODB_URL_LOCAL;
  db.MONGODB_DATABASE = process.env.MONGODB_DATABASE_LOCAL;
  db.PORT = process.env.LOCAL_PORT;
  db.env = "development";
  db.JWT_SK = process.env.JWT_SK;
  db.JWT_REFRESH_SK = process.env.JWT_REFRESH_SK;
  db.JWT_RESET_SK = process.env.JWT_RESET_SK;
  db.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
  db.EMAIL_USER = process.env.EMAIL_USER;
  db.EMAIL_PASS = process.env.EMAIL_PASS;
} else if (process.env.NODE_ENV == "qa") {
  db.MONGODB_URL = process.env.MONGODB_URL_QA;
  db.MONGODB_DATABASE = process.env.MONGODB_DATABASE_QA;
  db.PORT = process.env.QA_PORT;
  db.env = "qa";
  db.JWT_SK = process.env.JWT_SK;
  db.JWT_REFRESH_SK = process.env.JWT_REFRESH_SK;
  db.JWT_RESET_SK = process.env.JWT_RESET_SK;
  db.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
  db.EMAIL_USER = process.env.EMAIL_USER;
  db.EMAIL_PASS = process.env.EMAIL_PASS;
} else {
  db.MONGODB_URL = process.env.MONGODB_URL_PROD;
  db.MONGODB_DATABASE = process.env.MONGODB_DATABASE_PROD;
  db.PORT = process.env.PROD_PORT;
  db.env = "production";
  db.JWT_SK = process.env.JWT_SK;
  db.JWT_REFRESH_SK = process.env.JWT_REFRESH_SK;
  db.JWT_RESET_SK = process.env.JWT_RESET_SK;
  db.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
  db.EMAIL_USER = process.env.EMAIL_USER;
  db.EMAIL_PASS = process.env.EMAIL_PASS;
}

export default db;
