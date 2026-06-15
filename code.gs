function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  // Add CORS headers by returning JSONP or handling it standardly
  // Note: Google Apps script handles CORS if published correctly as "Anyone"
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var action = e.parameter.action;
    var timestamp = new Date();
    
    // 1. Handle RSVP Submissions
    if (action === 'rsvp') {
      var sheetName = 'RSVPs';
      var sheet = doc.getSheetByName(sheetName);
      
      // Auto-generate sheet and headers if it doesn't exist
      if (!sheet) {
        sheet = doc.insertSheet(sheetName);
        sheet.appendRow(['Timestamp', 'Name', 'Guests', 'Dietary Notes']);
        // Make the header bold
        sheet.getRange("A1:D1").setFontWeight("bold");
        sheet.setFrozenRows(1);
      }
      
      var name = e.parameter.name || '';
      var guests = e.parameter.guests || '';
      var dietaryNotes = e.parameter.dietaryNotes || '';
      
      sheet.appendRow([timestamp, name, guests, dietaryNotes]);
      
    // 2. Handle Wishes Submissions
    } else if (action === 'wish') {
      var sheetName = 'Wishes';
      var sheet = doc.getSheetByName(sheetName);
      
      // Auto-generate sheet and headers if it doesn't exist
      if (!sheet) {
        sheet = doc.insertSheet(sheetName);
        sheet.appendRow(['Timestamp', 'Name', 'Message']);
        // Make the header bold
        sheet.getRange("A1:C1").setFontWeight("bold");
        sheet.setFrozenRows(1);
      }
      
      var name = e.parameter.name || '';
      var message = e.parameter.message || '';
      
      sheet.appendRow([timestamp, name, message]);
      
    // Handle invalid action
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ 'result': 'error', 'error': 'Invalid or missing action parameter' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
