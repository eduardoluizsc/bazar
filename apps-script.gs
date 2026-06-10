// Cole esse código em https://script.google.com → New Project
// Depois: Deploy → New deployment → Web app
//   Execute as: Me | Who has access: Anyone → Deploy
// Copie a URL gerada e cole em index.html no lugar de APPS_SCRIPT_URL

const FOLDER_ID = '1PysZOkqsBUF3V2jvCOO-_9gXEIEhEpxV';

function doGet() {
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

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
