//googleapis
const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require("../practice-384605-b85d8d7f9282.json"); // 키 생성 후 다운된 json파일을 지정합니다.
const doc = new GoogleSpreadsheet("1bkFj89KvXdXt5l96sAbejUql-b0kTp0zTIJhv7ktMe4");

async function authGoogleSheet() {
    try {

        await doc.useServiceAccountAuth(gs_creds);
        await doc.loadInfo();
    } catch (err) {
        console.log("AUTH ERROR ", err)
    }
}

//(1) 구글스프레드시트에 있는 사용자인지 확인
exports.check = async(req, res, next) => {
  var exis=false;

  //googlesheet 불러오기
  authGoogleSheet(); 
  await doc.loadInfo();

  //해당 반의 시트를 불러온다.
  var sheet = doc.sheetsByIndex[req.body.class]; 
  await sheet.loadCells('B7:B100');

  for (var i = 7; i <= 96; i++) {
    if(sheet.getCellByA1('B'+i).value===req.body.name){
      exis=true;
    }
  }
  
  if (exis) {
    next();
  } else {
    res.status(403).send('STEP-UP 회원이 아닙니다.');
  }
};