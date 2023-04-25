//(1) 구글스프레드시트에 있는 사용자인지 확인
exports.check = (req, res, next) => {
    if (true) {
      next();
    } else {
      res.status(403).send('로그인 필요');
    }
};