import { google } from "googleapis";
import dovenv from 'dotenv'
import axios from 'axios'
dovenv.config()

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
      range: "user_behaviour!A:J",
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


export function formatCustomerData(data) {
  return data.map(obj => {
      return `Customer ID: ${obj.customer_id}, Product: ${obj.product_name}, Count: ${obj.order_count} , Name: ${obj.customer_name} , orderStatus: ${obj.order_status} , productUrl: ${obj.product_url} , productImg: ${obj.product_img} `;
  }).join('\n');
}


export async function getChatGPTResponse(prompt) {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SECRET_KEY}`
      }
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching response from ChatGPT:', error.response ? error.response.data : error.message);
    return null;
  }
}