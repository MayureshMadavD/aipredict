import { google } from "googleapis";

//Main function to fetch Database Data
export const getSheetFromData = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1dYLZVLet1BycvkWYFOOczHPhQPHuYe3MBqnEUiWsbjs";

    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "user_behaviour!A:G",
    });

    return getRows.data || [];
  } catch (e) {
    return [];
  }
};


// Function convert google sheet data to JSON
export function convertArrayToJSON(data) {
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
export function getObjectsByCustomerId(data, customerId) {
  return data.filter(item => item.customer_id === customerId);
}
