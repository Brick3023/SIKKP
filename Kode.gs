function doGet(e) {
  let page = e.parameter.page;
  if (page == null) page = "page1";
  var output = HtmlService.createTemplateFromFile(page);
  return output.evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}

function myURL() {
  return ScriptApp.getService().getUrl();
}

function readDataDiri() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName('DataDiri');
  
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 43).getValues();
  
  var dataDiri = [];
  for (var i = 0; i < data.length; i++) {
    var nama = data[i][0];
    var tempatKerja = data[i][1];
    var noHP = data[i][2];
    var pertanyaan = data[i].slice(3);

    dataDiri.push({
      nama: nama,
      tempatKerja: tempatKerja,
      noHP: noHP,
      pertanyaan: pertanyaan
    });
  }

  return dataDiri;
}

// Fungsi untuk menyimpan data baru
function simpanDataDiri(data) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('DataDiri');
  
  // Menyimpan data yang diterima dari client-side ke spreadsheet
sheet.appendRow([data.nama, data.tempatKerja, data.noHP, 
                 data.pertanyaan[0].jawaban, data.pertanyaan[1].jawaban, data.pertanyaan[2].jawaban, data.pertanyaan[3].jawaban, data.pertanyaan[4].jawaban, 
                 data.pertanyaan[5].jawaban, data.pertanyaan[6].jawaban, data.pertanyaan[7].jawaban, data.pertanyaan[8].jawaban, data.pertanyaan[9].jawaban, 
                 data.pertanyaan[10].jawaban, data.pertanyaan[11].jawaban, data.pertanyaan[12].jawaban, data.pertanyaan[13].jawaban, data.pertanyaan[14].jawaban, 
                 data.pertanyaan[15].jawaban, data.pertanyaan[16].jawaban, data.pertanyaan[17].jawaban, data.pertanyaan[18].jawaban, data.pertanyaan[19].jawaban, 
                 data.pertanyaan[20].jawaban, data.pertanyaan[21].jawaban, data.pertanyaan[22].jawaban, data.pertanyaan[23].jawaban, data.pertanyaan[24].jawaban, 
                 data.pertanyaan[25].jawaban, data.pertanyaan[26].jawaban, data.pertanyaan[27].jawaban, data.pertanyaan[28].jawaban, data.pertanyaan[29].jawaban, 
                 data.pertanyaan[30].jawaban, data.pertanyaan[31].jawaban, data.pertanyaan[32].jawaban, data.pertanyaan[33].jawaban, data.pertanyaan[34].jawaban, 
                 data.pertanyaan[35].jawaban, data.pertanyaan[36].jawaban, data.pertanyaan[37].jawaban, data.pertanyaan[38].jawaban, data.pertanyaan[39].jawaban]);
}
function deleteDataDiri(noHP) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('DataDiri');
  
  const data = sheet.getDataRange().getValues(); // Ambil seluruh data di sheet
  let rowIndexToDelete = -1;
  
  // Log untuk memeriksa data yang ada di sheet
  Logger.log('Data di Sheet: ' + JSON.stringify(data));
  
  for (let i = 1; i < data.length; i++) { // Mulai dari 1 untuk melewati header
    Logger.log('Memeriksa noHP di baris ' + (i + 1) + ': ' + data[i][2]); // Log nomor HP yang diperiksa
    if (data[i][2].toString().trim() === noHP.trim()) { // Cocokkan noHP yang ada di kolom C (indeks 2) dan pastikan tidak ada spasi
      rowIndexToDelete = i + 1; // Menyimpan indeks baris yang akan dihapus
      Logger.log('Ditemukan noHP yang cocok di baris ' + (i + 1));
      break;
    }
  }

  // Jika ditemukan rowIndexToDelete yang valid, lakukan penghapusan
  if (rowIndexToDelete !== -1) {
    Logger.log('Menghapus baris ' + rowIndexToDelete);
    sheet.deleteRow(rowIndexToDelete); // Menghapus baris
  } else {
    Logger.log('No HP tidak ditemukan');
  }
}






