//googleapis
const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require("../practice-384605-b85d8d7f9282.json"); // 키 생성 후 다운된 json파일을 지정합니다.
const doc = new GoogleSpreadsheet("1TkELS-U9GuAAtjtwv4Bzlqv-GoDlMKih4BooG8Qp0NI");

async function authGoogleSheet() {
    try {

        await doc.useServiceAccountAuth(gs_creds);
        await doc.loadInfo();
    } catch (err) {
        console.log("AUTH ERROR ", err)
    }
}


// 인증번호 생성 & return
exports.pnum = async(req, res) => {
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
        res.render('show');
    } 
};
  