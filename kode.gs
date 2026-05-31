const SPREADSHEET_ID = "1-MOA15HcM09aeLT0r_DHwdcUwKSF5nvNpXujIl4Mk6s";
const SHEET_NAME = "Sheet1";

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    
    // Ambil data komentar & RSVP (abaikan baris pertama/header)
    const comments = [];
    for (let i = 1; i < data.length; i++) {
      comments.push({
        timestamp: data[i][0],
        nama: data[i][1],
        ucapan: data[i][2],
        kehadiran: data[i][3],
        jumlahTamu: data[i][4]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", data: comments }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    let dataObj = e.parameter;
    if (e.postData && e.postData.contents) {
      dataObj = JSON.parse(e.postData.contents);
    }
    
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    const timestamp = new Date();
    const nama = dataObj.nama || "";
    const ucapan = dataObj.ucapan || "";
    const kehadiran = dataObj.kehadiran || "";
    const jumlahTamu = dataObj.jumlahTamu || "0";
    
    sheet.appendRow([timestamp, nama, ucapan, kehadiran, jumlahTamu]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
