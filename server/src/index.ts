import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routes/apiRoutes"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
