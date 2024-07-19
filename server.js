import express from "express";
import bodyParser from "body-parser";
import { getSheetFromData } from "./main.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("server running");
});

app.post("/customerd", async (req, res) => {
  try {
    const customer_id = req.body.customer_id;
    const dataValues = await getSheetFromData();
    const JSONdata = convertArrayToJSON(dataValues.values);
    const filteredCustomerData = getObjectsByCustomerId(JSONdata, customer_id);
    console.log(filteredCustomerData);

  } catch (e) {
    console.log(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});









