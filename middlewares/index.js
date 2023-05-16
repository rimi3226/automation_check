//googleapis
const { GoogleSpreadsheet } = require("google-spreadsheet");
const gs_creds = require("../practice-384605-b85d8d7f9282.json"); // 키 생성 후 다운된 json파일을 지정합니다.
const doc = new GoogleSpreadsheet("1bkFj89KvXdXt5l96sAbejUql-b0kTp0zTIJhv7ktMe4");

//구글 시트랑 연동시키기
async function authGoogleSheet() {
  try {

    await doc.useServiceAccountAuth(gs_creds);
    await doc.loadInfo();
  } catch (err) {
    console.log("AUTH ERROR ", err)
  }
}

//(1) 구글스프레드시트에 있는 사용자인지 확인
exports.check_person = async (req, res, next) => {
  try {
    //googlesheet 불러오기
    authGoogleSheet();
    await doc.loadInfo();

    //해당 반의 시트를 불러온다.
    var sheet = doc.sheetsByIndex[req.body.class];

    req.session.class = req.body.class; //세션에 반 정보 저장

    await sheet.loadCells('B7:D100');
    var exis = false;
    var i = 7;
    do {
      if (sheet.getCellByA1('B' + i).value === req.body.name) {
        exis = true;
        req.session.num = i;
        break;
      }
      i++;
    } while (i <= 96);

    const pnumber=sheet.getCellByA1('D' + req.session.num).value;
    req.session.pnumber=pnumber.substring(1,3)+pnumber.substring(4,8)+pnumber.substring(9,13);


    if (exis) {
      if('0'+req.session.pnumber!=req.body.pnumber){
        res.redirect(`/?Auth=nopnumber`);
      }else{
        next();
      }
    } else {
      res.redirect(`/?Auth=fail`);
    }
  } catch (err) {
    console.log(err);
    res.redirect(`/?Auth=error`);
  }
};

// (2) 인증번호가 맞는지 확인
exports.check_authnum = async (req, res, next) => {

  if (req.session.auth_num?.toString() === req.body.pass) {
    next();
  } else {
    res.redirect(`/?Auth=authfail`);
  }

};
