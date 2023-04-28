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


// 인증번호 생성 & return
exports.renderShow = async (req, res) => {
    try {
        authGoogleSheet();
        await doc.loadInfo();

        console.log('show!!!!!');
        console.log(req.session);

        //해당 반의 시트를 불러온다.
        var sheet = doc.sheetsByIndex[req.session.class];

        const id = req.session.num;
        await sheet.loadCells('B' + id + ':AF' + id);

        res.locals.name = sheet.getCellByA1('B' + id).value;
        res.locals.attendance = Math.ceil((sheet.getCellByA1('AB' + id).value) * 100);

        //출석 정보 배열에 담기
        var RC = [];
        var LC = [];

        for (var j = 69; j <= 90; j++) {
            if (j % 2 === 1) {
                if (sheet.getCellByA1((String.fromCharCode(j) + id)).value) {
                    RC.push('O');
                } else {
                    RC.push('X');
                }
            } else {
                if (sheet.getCellByA1((String.fromCharCode(j) + id)).value) {
                    LC.push('O');
                } else {
                    LC.push('X');
                }
            }
        }
    } catch (err) {
        // console.log(err);
    }
    //html로 데이터 보내기
    res.locals.RC = RC;
    res.locals.LC = LC;
    res.locals.total = RC || LC;

    res.render('show');
};

