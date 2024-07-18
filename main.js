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
