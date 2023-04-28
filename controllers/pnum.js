const html = `
<!DOCTYPE html>
<html>
    <script>
        alert('인증번호가 문자로 발송되었습니다.');
    </script>
</html>
`;

// 인증번호 생성 & return
exports.pnum = async (req, res) => {
    //난수 생성
    const num=Math.floor(Math.random() * (100000 - 10000) + 10000);
    console.log(num);
    req.session.auth_num=num;
    
    /*

    twillio로 보내는 코드

    */


    res.redirect(`/?Auth=complete`);


};
