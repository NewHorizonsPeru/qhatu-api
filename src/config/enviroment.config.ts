import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("src", "enviroments", `${process.env.NODE_ENV}.env`),
});

export default {
  NodeEnv: process.env.NODE_ENV || "development",
  ApiPort: process.env.API_PORT,
  SecretKey: process.env.SECRET_KEY,
  QhatuUrlDatabase: process.env.QHATU_URL_DATABASE,
};
