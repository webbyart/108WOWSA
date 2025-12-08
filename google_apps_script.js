/**
 * COPY THIS CODE INTO YOUR GOOGLE APPS SCRIPT EDITOR
 * 1. Go to your Google Sheet (ID: 1gpb9RQDNVmqoWMAacwUX_BNYYKol1DtI_3AF4AvoCyg)
 * 2. Extensions > Apps Script
 * 3. Paste this code.
 * 4. Run 'setupSheet' function once to create tabs.
 * 5. Deploy > New Deployment > Web App > Execute as: Me > Who has access: Anyone.
 * 6. Copy the URL and paste it into `constants.ts` in the React app.
 */

const SHEET_ID = "1gpb9RQDNVmqoWMAacwUX_BNYYKol1DtI_3AF4AvoCyg";

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const params = e.parameter;
    const action = params.action;
    
    // Parse body if post
    let body = {};
    if (e.postData && e.postData.contents) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (err) {
        // invalid json
      }
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);

    if (action === 'getContent') {
      const configSheet = ss.getSheetByName('Config');
      const data = configSheet.getDataRange().getValues();
      const content = {};
      // Skip header
      for (let i = 1; i < data.length; i++) {
        if(data[i][0]) content[data[i][0]] = data[i][1];
      }
      return responseJSON({ status: 'success', data: content });
    }

    if (action === 'getProjects') {
      const projectSheet = ss.getSheetByName('Projects');
      const data = projectSheet.getDataRange().getValues();
      const projects = [];
      for (let i = 1; i < data.length; i++) {
        projects.push({
          id: data[i][0],
          title: data[i][1],
          category: data[i][2],
          imageUrl: data[i][3],
          description: data[i][4]
        });
      }
      return responseJSON({ status: 'success', data: projects });
    }

    if (action === 'login') {
      const email = body.email;
      const password = body.password;
      // Hardcoded for safety in demo, better to store hashed in Users sheet
      if (email === 'admin@admin.com' && password === '123456') {
         return responseJSON({ status: 'success', token: 'mock-jwt-token-123' });
      }
      return responseJSON({ status: 'error', message: 'Invalid credentials' });
    }

    if (action === 'updateContent') {
      const key = body.key;
      const value = body.value;
      const configSheet = ss.getSheetByName('Config');
      const data = configSheet.getDataRange().getValues();
      let found = false;
      
      for (let i = 1; i < data.length; i++) {
        if (data[i][0] === key) {
          configSheet.getRange(i + 1, 2).setValue(value);
          found = true;
          break;
        }
      }
      
      if (!found) {
        configSheet.appendRow([key, value]);
      }
      return responseJSON({ status: 'success' });
    }

    return responseJSON({ status: 'error', message: 'Unknown action' });

  } catch (err) {
    return responseJSON({ status: 'error', message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function setupSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  if (!ss.getSheetByName('Config')) {
    const sheet = ss.insertSheet('Config');
    sheet.appendRow(['Key', 'Value']);
    // Seed default data
    sheet.appendRow(['home_hero_title', 'สร้างปรากฏการณ์ความสนุกสุด WOW!']);
    sheet.appendRow(['contact_phone', '02-123-4567']);
  }
  
  if (!ss.getSheetByName('Projects')) {
    const sheet = ss.insertSheet('Projects');
    sheet.appendRow(['ID', 'Title', 'Category', 'ImageUrl', 'Description']);
    sheet.appendRow(['1', 'Sample Sport Day', 'Sport Day', 'https://picsum.photos/600/400', 'Description here']);
  }
  
  if (!ss.getSheetByName('Users')) {
    const sheet = ss.insertSheet('Users');
    sheet.appendRow(['Email', 'PasswordHash']);
  }
}