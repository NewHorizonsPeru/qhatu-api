import dotenv from "dotenv";

const initializeDotEnv = () => {
  dotenv.config();
};

const enviroment = {
  ApiPort: process.env.API_PORT ?? "2705",
  SecretKey: process.env.SECRET_KEY ?? "Default Secret Key",
};

export { initializeDotEnv, enviroment };
