import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./routes/apiRoutes"));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
