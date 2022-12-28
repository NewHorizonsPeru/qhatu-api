import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve("src", "enviroments", `${process.env.NODE_ENV}.env`),
});

export default {
  NodeEnv: process.env.NODE_ENV || "development",
  ApiPort: process.env.API_PORT || 2705,
  SecretKey:
    process.env.SECRET_KEY ||
    "9bf7a2c1d915c2f0489ba246f1898f1f7e59182e055c9f4443c4250ab55fa572",
  QhatuUrlDatabase:
    process.env.QHATU_URL_DATABASE ||
    "mongodb+srv://usr-qhatu:NewHorizons-2022@cluster-qhatu.rh0ntbh.mongodb.net/qhatu",
};
