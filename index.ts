import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";
import registerRoutes from "./src/routes/qhatu.router";

const app: Express = express();
dotenv.config();
const port = process.env.API_PORT;

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.send("🦊 Express & TypeScript");
});
/** METODO GET
 *  URL PARAMS
 *  **/

app.get("/categories/:init/:limit", (request: Request, response: Response) => {
  const { init, limit } = request.params;
  response.json({
    init,
    limit,
  });
});
/**
 *  QUERY PARAMS
 *  +*/
app.get("/sales", (request: Request, response: Response) => {
  const { startDate, endDate } = request.query;
  if (startDate && endDate) {
    response.json({
      startDate,
      endDate,
    });
  } else {
    response.json({
      error: true,
      message: "Missing value in startDate or endDate",
    });
  }
});

registerRoutes(app);

app.listen(port, () => {
  console.log(`⚡️ Message: Server is running 🔥`);
});
