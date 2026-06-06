# Access-gate logging — setup

Captures the **email + date/time** (plus user agent and referrer) of every successful login on the splash gate and writes them to a Google Sheet. Works with the static GitHub Pages site.

## Architecture (why this way)
For a static site with a Google Sheet destination, a **Google Apps Script Web App** is the simplest correct backend — no server to run. The page does a one-line `fetch` POST to the Web App's `/exec` URL; the script appends a row. This is the recommended approach for this stack.

Design choices already built into the page:
- The password is validated **client-side**, so the site always opens even if logging is down. Logging is **fire-and-forget** — a failed POST never blocks entry.
- The POST body is sent as `text/plain` to avoid a CORS preflight that Apps Script cannot answer, and uses `mode:'no-cors'` (we don't need to read the response because entry is already decided client-side).
- Email is **required** and validated before entry. Only **successful logins** are sent.

## One-time setup

1. **Create the Sheet.** New Google Sheet. From its URL copy the ID:
   `https://docs.google.com/spreadsheets/d/`**`THIS_IS_THE_ID`**`/edit`
   (A tab named `Visits` with headers is created automatically on the first write.)

2. **Add the script.** In that Sheet: **Extensions → Apps Script**. Replace the default code with `Code.gs` from this folder. Set `SHEET_ID` to the ID from step 1.

3. **(Recommended) Store the access code as a property.** Apps Script **Project Settings → Script properties → Add**: name `ACCESS_CODE`, value `excite`. With this set, the server recomputes `granted` from the submitted passcode, so spoofed POSTs are flagged `FALSE`.

4. **Deploy.** **Deploy → New deployment → Type: Web app.**
   - **Execute as:** Me
   - **Who has access:** Anyone
   - Click **Deploy**, authorize when prompted, and **copy the Web app URL** (ends in `/exec`).

5. **Point the site at it.** In `index.html`, find:
   ```js
   var GAS_ENDPOINT="PASTE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   Replace the placeholder with the `/exec` URL. Commit and push to GitHub Pages. Until this is set, the gate works normally and logging is skipped.

6. **Test.** Open the site, enter a real email + the password. A row should appear in `Visits`: `Timestamp, Email, Granted, User agent, Referrer, IP`.

## Updating the script later
After editing `Code.gs`: **Deploy → Manage deployments → (edit, pencil) → Version: New version → Deploy.** The `/exec` URL stays the same.

## Notes & limitations
- **IP:** Apps Script cannot see the visitor's IP, and we chose not to add a third-party lookup, so the IP column records `not-available-from-client`. If you later want IP, add a small client-side call to `https://api.ipify.org?format=json` and include `ip` in the POST body — the script already reads `data.ip`.
- **Endpoint is public.** Anyone who views source can see the `/exec` URL and POST to it. The `ACCESS_CODE` property check keeps junk rows flagged `FALSE`; keep the Sheet itself private. This is an acceptable trade for a soft marketing gate (the password was already visible client-side).
- **Privacy/consent:** because you're now collecting email (and this is investor-facing), consider adding a one-line consent/privacy note to the gate before go-live. Happy to add it on request.
- **Spreadsheet quotas:** Apps Script `appendRow` is fine for normal traffic; extreme volume could hit daily quotas.
