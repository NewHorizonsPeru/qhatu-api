import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import passport from "passport";
import cors from "cors";
import swagggerUi from "swagger-ui-express";
import swaggerConfig from "./src/config/swagger.config";

import {
  boomErrorMiddleware,
  jsonErrorMiddleware,
  logErrorMiddleware,
} from "./src/middlewares/error.middleware";
import registerRoutes from "./src/routes/qhatu.router";
import registerStrategies from "./src/strategies/strategies";
import { corsOptions } from "./src/config/cors.config";
import { enviroment, initializeDotEnv } from "./src/config/enviroment.config";

const app: Express = express();

initializeDotEnv();

app.use(express.json());
app.use(cors(corsOptions));
app.use(passport.initialize());

registerStrategies();
registerRoutes(app);

app.use("/swagger", swagggerUi.serve, swagggerUi.setup(swaggerConfig));

app.use(logErrorMiddleware);
app.use(boomErrorMiddleware);
app.use(jsonErrorMiddleware);

app.listen(enviroment.ApiPort, () => {
  console.log(`⚡️ Message: Server is running 🔥`);
});
