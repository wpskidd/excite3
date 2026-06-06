/**
 * Excite access-gate logger — Google Apps Script Web App
 * -----------------------------------------------------
 * Receives a POST from the site's splash gate (on successful login) and appends
 * one row to a Google Sheet. Designed to be called from a static GitHub Pages site.
 *
 * The site sends the body as text/plain (a CORS "simple request") so no preflight
 * is required; the JSON is still readable here via e.postData.contents.
 *
 * SETUP: see SETUP.md in this folder.
 */

// The Sheet that will receive rows. Paste the ID from the sheet URL:
// https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
var SHEET_ID = '1LPCvYAA6Y1Xcpagkra7m_uA7LlIFex5fgnukTiId6nM';
var SHEET_NAME = 'Visits';

// Optional but recommended: store the access code as a Script Property named
// ACCESS_CODE (Project Settings > Script properties). If set, the server
// recomputes "granted" from the submitted passcode, so spoofed POSTs are flagged.
function getAccessCode_() {
  return PropertiesService.getScriptProperties().getProperty('ACCESS_CODE');
}

function doPost(e) {
  var out = { ok: false };
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    var email = String(data.email || '').trim().toLowerCase();
    var code = getAccessCode_();
    var passcode = String(data.passcode || '');
    var granted = code ? (passcode === code) : (data.granted === true);

    // IP is not available to Apps Script from a browser client. If the page is
    // later configured to send one, it is read here; otherwise a placeholder.
    var ip = String(data.ip || (e && e.parameter && e.parameter.ip) || 'not-available-from-client');

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Email', 'Granted', 'User agent', 'Referrer', 'IP']);
    }

    sheet.appendRow([
      new Date(),
      email,
      granted,
      String(data.userAgent || ''),
      String(data.referrer || ''),
      ip
    ]);

    out.ok = granted;
  } catch (err) {
    out.error = String(err);
  }

  return ContentService
    .createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

// Lets you confirm the deployment is live by visiting the /exec URL in a browser.
function doGet() {
  return ContentService.createTextOutput('Excite gate logger is running.');
}
