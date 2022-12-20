import { CorsOptions } from "cors";

const whiteList = [
  "http://localhost:2705",
  "https://qhatu.com.pe",
  "http://localhost:4200",
];

const corsOptions: CorsOptions = {
  origin: (origin: any, callback: any) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export { corsOptions };
