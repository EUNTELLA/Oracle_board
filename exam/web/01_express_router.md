# Express 라우터

## 기본 구조

Express는 Node.js에서 웹 서버를 만들기 위한 프레임워크이다.

이 프로젝트의 웹 서버 시작 흐름은 다음과 같다.

```text
web/bin/www
  -> web/app.js
  -> web/routes/*.js
  -> web/views/*.ejs
```

- `web/bin/www`: 서버 포트 설정 및 서버 실행
- `web/app.js`: Express 앱 설정, 미들웨어 등록, 라우터 연결
- `web/routes/`: URL 요청을 처리하는 라우터 파일
- `web/views/`: EJS 화면 파일
- `web/connect.js`: Oracle DB 연결 설정

## 라우터 연결

`app.js`에서 라우터를 연결하면 해당 경로 아래로 요청이 들어온다.

```javascript
app.use('/haksa', require('./routes/haksa'));
```

위 코드 때문에 `haksa.js` 안의 라우트는 앞에 `/haksa`가 붙는다.

```javascript
router.get('/pro', function (req, res) {
    res.render('index', { title: '교수관리', pageName: 'haksa/professors.ejs' });
});
```

실제 접속 경로:

```text
GET /haksa/pro
```

`/pro`로 직접 접속하면 등록된 라우트가 없어서 404가 발생한다.

## 주요 경로

| Method | Path | 설명 |
| --- | --- | --- |
| GET | `/` | 메인 페이지 |
| GET | `/haksa/pro` | 교수 관리 페이지 |
| GET | `/haksa/pro/list.json` | 교수 목록 JSON |
| GET | `/haksa/pro/insert` | 교수 등록 페이지 |
| POST | `/haksa/pro/insert` | 교수 등록 처리 |
| POST | `/haksa/pro/delete` | 교수 삭제 처리 |
| GET | `/haksa/stu` | 학생 관리 페이지 |
| GET | `/haksa/stu/list.json` | 학생 목록 JSON |
| GET | `/haksa/stu/insert` | 학생 등록 페이지 |
| POST | `/haksa/stu/insert` | 학생 등록 처리 |
| POST | `/haksa/stu/delete` | 학생 삭제 처리 |
| GET | `/haksa/cou` | 강좌 관리 페이지 |

