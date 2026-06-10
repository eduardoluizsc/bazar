// Cole esse código em https://script.google.com → New Project
// Depois: Deploy → New deployment → Web app
//   Execute as: Me | Who has access: Anyone → Deploy
// Copie a URL gerada e cole em index.html no lugar de APPS_SCRIPT_URL

const FOLDER_ID = '1PysZOkqsBUF3V2jvCOO-_9gXEIEhEpxV';

function doGet(e) {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const files = folder.getFiles();
  const result = [];

  while (files.hasNext()) {
    const file = files.next();
    const mimeType = file.getMimeType();
    if (!mimeType.startsWith('image/')) continue;
    result.push({
      id: file.getId(),
      name: file.getName()
    });
  }

  const json = JSON.stringify(result);
  const callback = e && e.parameter && e.parameter.callback;

  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
