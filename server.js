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



// UTILS FUNCTIONS


// Function convert google sheet data to JSON
function convertArrayToJSON(data) {
  // Extract the keys from the first array
  const keys = data[0];
  

  const result = [];
  
  for (let i = 1; i < data.length; i++) {
      const values = data[i];
      const obj = {};
      
      keys.forEach((key, index) => {
          obj[key.trim()] = values[index];
      });
      
      result.push(obj);
  }
  
  return result;
}

// function to get filter json data based on customer id
function getObjectsByCustomerId(data, customerId) {
  return data.filter(item => item.customer_id === customerId);
}




