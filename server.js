import express from "express";
import bodyParser from "body-parser";
import { getSheetFromData } from "./main.js";

const app = express();
const port = 2000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server running");
});

app.post("/customerd", async (req, res) => {
  try {
    const reqs = req.body;
    const dataValues = await getSheetFromData();
    console.log(dataValues.values);
    console.log(reqs);
  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
