import dotenv from "dotenv";
import express, { Request, Response, Express } from "express";

const app: Express = express();
dotenv.config();
const port = process.env.API_PORT;

app.get("/", (request: Request, response: Response) => {
  response.send("🦊 Express & TypeScript");
});
/** METODO GET
 *  URL PARAMS
 *  **/
app.get("/products", (request: Request, response: Response) => {
  response.json([
    {
      productId: 1,
      productName: "Product 01",
    },
    {
      productId: 2,
      productName: "Product 02",
    },
  ]);
});

app.get("/product/search", (request: Request, response: Response) => {
  response.send("Products Search");
});

app.get("/product/:productId", (request: Request, response: Response) => {
  const { productId } = request.params;
  response.json({
    productId: productId,
    productName: "Leche Evaporada Danlac",
  });
});

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
app.listen(port, () => {
  console.log(`⚡️ Message: Server is running 🔥`);
});
