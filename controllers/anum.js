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


//구글시트에서 사용자 출석 정보 불러오기
exports.anum = async (req, res) => {
    //googlesheet 불러오기
    authGoogleSheet();
    await doc.loadInfo();

    //해당 반의 시트를 불러온다.
    var sheet = doc.sheetsByIndex[req.body.class];

    req.session.class=req.body.class; //세션에 반 정보 저장

    await sheet.loadCells('B7:B100');

    var i = 7;

    do {
        if (sheet.getCellByA1('B' + i).value === req.body.name) {
            exis = true;
            req.session.num = i; //세션에 반 정보 저장
        }
        i++
    } while (i <= 96);


    if (exis) {
        console.log(req.session);
        res.redirect('/show');
    }
};
