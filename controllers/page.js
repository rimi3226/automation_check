exports.renderMain = (req, res) => {
  console.log(req.query);
  if (req.query.Auth === 'complete') {
    res.locals.message = '인증번호가 문자로 발송되었습니다.';
  } else if (req.query.Auth === 'fail') {
    res.locals.message = '사용자를 찾지 못했습니다. 다시 시도해주세요.';
  } else if (req.query.Auth === 'authfail') {
    res.locals.message = '인증번호가 틀렸습니다.';
  } else if (req.query.Auth === 'nopnumber') {
    res.locals.message = '전화번호가 틀렸습니다.';
  } else if (req.query.Auth === 'error') {
    res.locals.message = '에러가 발생했습니다. 어학상담실로 문의해주세요.';
  }
  res.render('main');

};
