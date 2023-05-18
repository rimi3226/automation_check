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

        //해당 반 시트를 불러오기
        var sheet = doc.sheetsByIndex[req.session.class];

        //학생 정보를 session에 저장
        const id = req.session.num;

        //구글 스프레드시트에서 학생 정보 불러오기
        await sheet.loadCells('B' + id + ':Z' + id);

        res.locals.name = sheet.getCellByA1('B' + id).value;
        res.locals.attendance = Math.ceil((sheet.getCellByA1('Z' + id).value) * 100);

        //출석 정보 배열에 담기
        var RC = [];
        var LC = [];

        for (var j = 69; j <= 88; j++) {
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
        console.log(err);
    }

    //html로 데이터 보내기
    res.locals.RC = RC;
    res.locals.LC = LC;
    res.locals.total = RC && LC;

    res.render('show');
};

