import { config } from "dotenv";
config();
let configuration = {};

configuration.MONGODB_DATABASE = process.env.MONGODB_DATABASE;
configuration.PORT = process.env.PORT;
configuration.JWT_SK = process.env.JWT_SK;
configuration.JWT_REFRESH_SK = process.env.JWT_REFRESH_SK;
configuration.JWT_RESET_SK = process.env.JWT_RESET_SK;
configuration.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
configuration.EMAIL_USER = process.env.EMAIL_USER;
configuration.EMAIL_PASS = process.env.EMAIL_PASS;

if (process.env.NODE_ENV == "development") {
  configuration.MONGODB_URL = process.env.MONGODB_URL_LOCAL;
  configuration.env = "development";
} else if (process.env.NODE_ENV == "production") {
  configuration.MONGODB_URL = process.env.MONGODB_URL_PROD;
  configuration.env = "production";
}

export default configuration;
