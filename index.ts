import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import registerRoutes from "./src/routes/qhatu.router";

const app: Express = express();
dotenv.config();
const port = process.env.API_PORT;

app.use(express.json());

registerRoutes(app);

app.listen(port, () => {
  console.log(`⚡️ Message: Server is running 🔥`);
});
