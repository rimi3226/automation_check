//모듈 불러오기
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const { google } = require('googleapis');

//dotenv 불러오기
dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const showRouter = require('./routes/show');
const logger = require('./logger');

//라우터 기본 설정
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

//미들웨어 
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public'))); //폴더명+public path를 얻기 위함
app.use(express.json()); //json 요청 받을 수 있게함
app.use(express.urlencoded({ extended: false })); //form 요청 받을 수 있게함
app.use(cookieParser(process.env.COOKIE_SECRET)); //쿠키 전송하는거 처리
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, //개발 시에는 https를 안쓰기 때문에 false
  },
};

if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
}
app.use(session(sessionOption));

// 라우터 연결
app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/show', showRouter);

// 라우터가 없을 경우
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`); //없는 페이지에 온 경우, 404 Not Found
  error.status = 404;
  logger.info('logger');
  logger.error(error.message);
  next(error);
});

//에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;