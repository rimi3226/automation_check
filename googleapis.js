const { google } = require('googleapis');

// 구글 클라우드 플랫폼에서 생성한 인증 정보 JSON 파일 경로
const auth = require('./credentials.json');

// 인증 정보를 기반으로 인증 클라이언트 생성
const client = new google.auth.JWT(
  auth.client_email,
  null,
  auth.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// 구글 스프레드시트 ID
const spreadsheetId = 'your-spreadsheet-id';

async function readSheet() {
  try {
    // 인증 클라이언트로 구글 스프레드시트 API를 초기화
    const sheets = google.sheets({ version: 'v4', auth: client });

    // 스프레드시트에서 읽어올 범위 (A1 셀부터 D10 셀까지)
    const range = 'Sheet1!A1:D10';

    // 스프레드시트 값 읽기 요청
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    // 응답에서 값 추출
    const rows = res.data.values;
    console.log(rows);
  } catch (err) {
    console.error(err);
  }
}

async function writeSheet() {
  try {
    // 인증 클라이언트로 구글 스프레드시트 API를 초기화
    const sheets = google.sheets({ version: 'v4', auth: client });

    // 쓸 데이터
    const data = [
      ['Name', 'Age', 'City'],
      ['John', '30', 'New York'],
      ['Jane', '25', 'Tokyo'],
      ['Bob', '45', 'London'],
    ];

    // 스프레드시트에 쓸 범위 (A1 셀부터 C4 셀까지)
    const range = 'Sheet2!A1:C4';

    // 스프레드시트 값 쓰기 요청
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: {
        values: data,
      },
    });

    console.log(`Updated ${res.data.updatedCells} cells`);
  } catch (err) {
    console.error(err);
  }
}

// readSheet 함수 실행
readSheet();

// writeSheet 함수 실행
writeSheet();
