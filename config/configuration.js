import { config } from "dotenv";
config();
let configuration = {};

if (process.env.NODE_ENV == "development") {
  configuration.MONGODB_URL = process.env.MONGODB_URL_LOCAL;
  configuration.MONGODB_DATABASE = process.env.MONGODB_DATABASE_LOCAL;
  configuration.PORT = process.env.LOCAL_PORT;
  configuration.env = "development";
  configuration.JWT_SK = process.env.JWT_SK;
  configuration.JWT_REFRESH_SK = process.env.JWT_REFRESH_SK;
  configuration.JWT_RESET_SK = process.env.JWT_RESET_SK;
  configuration.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
  configuration.EMAIL_USER = process.env.EMAIL_USER;
  configuration.EMAIL_PASS = process.env.EMAIL_PASS;
} else if (process.env.NODE_ENV == "qa") {
  configuration.MONGODB_URL = process.env.MONGODB_URL_QA;
  configuration.MONGODB_DATABASE = process.env.MONGODB_DATABASE_QA;
  configuration.PORT = process.env.QA_PORT;
  configuration.env = "qa";
  configuration.JWT_SK = process.env.JWT_SK;
  configuration.JWT_REFRESH_SK = process.env.JWT_REFRESH_SK;
  configuration.JWT_RESET_SK = process.env.JWT_RESET_SK;
  configuration.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
  configuration.EMAIL_USER = process.env.EMAIL_USER;
  configuration.EMAIL_PASS = process.env.EMAIL_PASS;
} else {
  configuration.MONGODB_URL = process.env.MONGODB_URL_PROD;
  configuration.MONGODB_DATABASE = process.env.MONGODB_DATABASE_PROD;
  configuration.PORT = process.env.PROD_PORT;
  configuration.env = "production";
  configuration.JWT_SK = process.env.JWT_SK;
  configuration.JWT_REFRESH_SK = process.env.JWT_REFRESH_SK;
  configuration.JWT_RESET_SK = process.env.JWT_RESET_SK;
  configuration.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
  configuration.EMAIL_USER = process.env.EMAIL_USER;
  configuration.EMAIL_PASS = process.env.EMAIL_PASS;
}

export default configuration;
