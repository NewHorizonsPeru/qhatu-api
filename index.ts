import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import passport from "passport";
import cors from "cors";

import {
  boomErrorMiddleware,
  jsonErrorMiddleware,
  logErrorMiddleware,
} from "./src/middlewares/error.middleware";
import registerRoutes from "./src/routes/qhatu.router";
import registerStrategies from "./src/strategies/strategies";

const app: Express = express();
dotenv.config();
const port = process.env.API_PORT;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
registerStrategies();
registerRoutes(app);

app.use(logErrorMiddleware);
app.use(boomErrorMiddleware);
app.use(jsonErrorMiddleware);

app.listen(port, () => {
  console.log(`⚡️ Message: Server is running 🔥`);
});
