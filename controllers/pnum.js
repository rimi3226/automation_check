//dotenv 불러오기
const dotenv = require('dotenv');
dotenv.config();

//twilio 불러오기
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);



// 인증번호 생성 & return
exports.pnum = async (req, res) => {
    //난수 생성
    const num = Math.floor(Math.random() * (100000 - 10000) + 10000);
    console.log(num);
    req.session.auth_num = num;

    //twilio로 보낼 전화번호 생성
    const phone='+82'+req.session.pnumber;
    console.log(phone);

    //twilio
    // try {
    //     client.messages
    //         .create({
    //             body: 'STEP-UP 출석 확인 인증 번호입니다 : ' + num,
    //             from: '+16203494088',
    //             to: phone
    //         })
    //         .then(message => console.log(message.sid));
    // } catch (err) {
    //     console.log(err);
    // }
    
    res.redirect(`/?Auth=complete`);

};

