// 인증번호 생성 & return
exports.pnum = async (req, res) => {
    //난수 생성
    const num=Math.floor(Math.random() * (100000 - 10000) + 10000);

    req.session.auth_num=num;
    
    /*

    twillio로 보내는 코드

    */

    res.render('modal');

};
