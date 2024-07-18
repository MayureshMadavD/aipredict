const { google } = require("googleapis")
require('dotenv').config();


const sheetName = ['Mayuresh', 'Rohit', 'Anek', 'Deepak', 'Ankit', 'Mukul', 'Nishant','Shruthi','Shahbaz']

const triggerApiCall = async (sheetName) => {
    try {

        const auth = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        })

        const client = await auth.getClient();
        const googleSheets = google.sheets({ version: 'v4', auth: client })

        const spreadsheetId = '1dYLZVLet1BycvkWYFOOczHPhQPHuYe3MBqnEUiWsbjs';
        


    } catch (e) {
        console.log("Not Data To Push")
    }

}






//triggerApiCall(sheetName)
