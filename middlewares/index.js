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
authGoogleSheet(); // 처음 시작할 때 문서 접속에 대한 인증을 처리하고 해당 문서를 로드합니다.


//(1) 구글스프레드시트에 있는 사용자인지 확인
exports.check = (req, res, next) => {
  var exis=true;


  if (exis) {
    next();
  } else {
    res.status(403).send('STEP-UP 회원이 아닙니다.');
  }
};