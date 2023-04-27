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
exports.renderShow = async (req, res) => {
    authGoogleSheet();
    await doc.loadInfo();

    //해당 반의 시트를 불러온다.
    var sheet = doc.sheetsByIndex[req.session.class];

    const num=req.session.num;
    await sheet.loadCells('B'+num+':AF'+num);

    res.locals.name=sheet.getCellByA1('B'+num).value;
    res.locals.attendance=(sheet.getCellByA1('AB'+num).value)*100;
    
    //출석 정보 배열에 담기
    var RC=[];
    var LC=[];

    for(var j=69;j<=90;j++){
        if(j%2===1){
            if(sheet.getCellByA1((String.fromCharCode(j)+num)).value){
                RC.push('O');
            }else{
                RC.push('X');
            }
        }else{
            if(sheet.getCellByA1((String.fromCharCode(j)+num)).value){
                LC.push('O');
            }else{
                LC.push('X');
            }
        }
    }

    res.locals.RC=RC;
    res.locals.LC=LC;
    res.locals.total=RC||LC;

    res.render('show');
};

