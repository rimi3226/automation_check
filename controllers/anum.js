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
    console.log(req.session);
    res.redirect('/show');

};
