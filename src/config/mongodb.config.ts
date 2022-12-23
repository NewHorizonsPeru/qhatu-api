import mongoose from "mongoose";
import enviroment from "./enviroment.config";

const mongoDbOptions: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
};

mongoose.connect(enviroment.QhatuUrlDatabase!, mongoDbOptions);
const qhatuDatabase = mongoose.connection;

qhatuDatabase.on("error", (error) => {
  console.log(`[DATABASE]: ${error} 😰`);
});

qhatuDatabase.once("connected", () => {
  console.log(`[DATABASE]: Database connected! 😛`);
});
