import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = 5000;

// listening to the app

import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error`, error);
    });

    // listening on port
    app.listen(PORT, () => {
      console.log(`* Server is runung on port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo db connection failed !!! ", error);
  });
