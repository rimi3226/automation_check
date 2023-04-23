const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require("./practice-384605-b85d8d7f9282.json"); // 키 생성 후 다운된 json파일을 지정합니다.
const doc = new GoogleSpreadsheet("1TkELS-U9GuAAtjtwv4Bzlqv-GoDlMKih4BooG8Qp0NI");

async function authGoogleSheet() {
    try {

        await doc.useServiceAccountAuth(gs_creds);
        await doc.loadInfo();
    } catch (err) {
        console.log("AUTH ERROR ", err)
    }
}
authGoogleSheet(); // 처음 시작할 때 문서 접속에 대한 인증을 처리하고 해당 문서를 로드합니다.

async function readFirstSheetRow() {
    await doc.loadInfo();
    var sheet = doc.sheetsByIndex[0]; // 첫번째 시티를 가져옵니다.

    //cells로 읽는 방법
    await sheet.loadCells('A1:L15');
    const cellA1 = sheet.getCell(0, 0);
    const cellC3 = sheet.getCellByA1('C3');

    //cells로 쓰는 방법
    cellA1.note = 'This is cell A1';
    cellA1.value = 123.45;
    cellA1.textFormat = { bold: true };
    cellC3.formula = '=A1';

    await sheet.saveUpdatedCells(); // saves both cells in one API call

}
readFirstSheetRow();