import { CorsOptions } from "cors";

const whiteList = [
  "http://localhost:2705",
  "https://qhatu.com.pe",
  "http://localhost:4200",
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin) {
      if (whiteList.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    }
  },
};

export { corsOptions };
