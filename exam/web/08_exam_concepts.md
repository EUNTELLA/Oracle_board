# 시험 핵심 정리

웹 학사 관리 프로젝트에서 시험에 자주 나올 개념을 쉬운 언어로 정리했습니다.

## 1. Express 라우터 연결과 URL

- `web/app.js`에서 `app.use('/haksa', require('./routes/haksa'))`를 쓰면 모든 `haksa.js` 라우트는 `/haksa` 접두사가 붙는다.
- `router.get('/pro', ...)`가 정의되어 있으면 실제 요청 경로는 `/haksa/pro`이다.
- `GET /pro`로 접속하면 404가 나오는 이유는 `/haksa`가 빠졌기 때문이다.

시험 포인트:
- `app.use()`와 `router.get()`은 각각 무엇을 연결하는가?
- URL 경로가 어떻게 만들어지는가?

## 2. EJS 템플릿과 `pageName`

- 서버에서 `res.render('index', { title: ..., pageName: 'haksa/students.ejs' })`로 렌더링한다.
- `views/index.ejs`는 공통 레이아웃이고 실제 내용은 `pageName`으로 포함된다.
- EJS에서 `<%= code %>`처럼 변수 이름이 정확해야 값이 출력된다.

시험 포인트:
- `res.render()`와 `<%- include(pageName) %>`의 역할
- 서버에서 보낸 `code`, `title`, `pageName` 변수 이름 맞추기

## 3. Ajax 비동기 요청

- jQuery Ajax는 페이지를 새로고침하지 않고 데이터를 가져온다.
- 요청은 비동기이므로 `success` 콜백 내부에서만 데이터를 화면에 넣어야 한다.
- 서버는 JSON을 `res.send(result.rows)`로 응답한다.

예시:
```javascript
$.ajax({
    type: 'get',
    url: '/haksa/stu/list.json',
    success: function(data) {
        const temp = Handlebars.compile($('#temp_students').html());
        $('#tbl_students').html(temp(data));
    }
});
```

시험 포인트:
- Ajax 요청에서 `type`, `url`, `success`의 역할
- 브라우저 콘솔과 서버 콘솔의 출력 위치 차이

## 4. Handlebars 템플릿

- Ajax로 받은 JSON 배열을 `{{#each .}}`로 반복 출력한다.
- `data-` 속성은 jQuery `.data()`로 읽을 수 있다.
- `data-scode="{{SCODE}}"`처럼 써야 `$(this).data('scode')`가 값이 나온다.

시험 포인트:
- Handlebars 반복 구문 구조
- `data-` 속성 사용법

## 5. Oracle DB 연결과 SQL 실행

- `web/connect.js`에서 `getConnection()`을 통해 Oracle DB에 연결한다.
- Oracle 11g 이하에서는 `oracledb.initOracleClient({ libDir: ... })`를 먼저 실행해야 한다.
- `await oracledb.getConnection({...})`과 `await con.execute(sql, binds, options)`는 비동기 호출이다.
- SQL 실행 후에는 `finally`에서 `if (con) await con.close()`로 연결을 닫는다.

시험 포인트:
- `getConnection()`의 역할
- `initOracleClient()`가 필요한 경우
- `finally`에서 연결 닫는 이유

## 6. 바인드 변수와 autoCommit

- SQL에 값을 직접 붙이면 오류가 나거나 SQL Injection이 발생할 수 있다.
- 안전한 방식은 바인드 변수 사용:
  - `:scode`, `:pcode` 등
  - `await con.execute(sql, { scode, pcode }, { autoCommit: true })`
- 변경 SQL(INSERT/UPDATE/DELETE)은 `autoCommit: true` 또는 직접 `COMMIT`이 필요하다.

시험 포인트:
- 바인드 변수의 장점
- `autoCommit`의 역할

## 7. CRUD 흐름과 비동기

- 학생 목록 페이지는 화면을 먼저 렌더링하고, Ajax로 `/haksa/stu/list.json`을 호출하여 실제 데이터를 가져온다.
- 등록은 `GET /haksa/stu/insert`로 입력 화면을 보여주고, `POST /haksa/stu/insert`로 데이터를 DB에 저장한다.
- 삭제는 버튼 클릭 후 Ajax로 `POST /haksa/stu/delete`를 보낸다.
- `async function(req, res)`를 쓴 이유는 DB 요청이 비동기이기 때문이다.

시험 포인트:
- CRUD 요청별 HTTP 메서드와 경로
- `req.body`의 사용과 `express.urlencoded()` 필요성
- `res.sendStatus(200)`와 `res.send()`의 차이

## 8. Oracle View와 외부 조인

- `view_students`는 `students`와 `professors`를 조인하여 교수 이름과 학생 정보를 함께 보여준다.
- Oracle 외부 조인은 `p.pcode(+) = s.advisor` 형태로 쓴다.
- 뷰를 쓰면 코드에서 `select * from view_students`처럼 간단히 조회할 수 있다.

시험 포인트:
- 뷰(View)의 목적
- 외부 조인 문법과 결과

## 9. 자주 나오는 오류

- 404: 라우터 경로가 잘못되었거나 prefix가 빠졌을 때
- ORA-00942: 테이블 또는 뷰가 없을 때
- ORA-12899: 컬럼 길이보다 긴 값을 넣을 때
- ORA-00911: SQL 문법 오류 또는 잘못된 문자열 입력

시험 포인트:
- 각 오류의 원인과 확인 방법
- `SELECT USER FROM dual`, `SELECT table_name FROM user_tables`로 확인하기

## 10. 시험 대비 체크리스트

- `app.js`의 라우터 연결과 미들웨어
- `res.render()` + `pageName` 구조
- Ajax 요청 흐름과 Handlebars 출력
- `async/await`가 필요한 이유
- `getConnection()`, `con.execute()`, `con.close()` 순서
- 바인드 변수와 `autoCommit`
- `view_students` 생성과 외부 조인
- 주요 ORA 에러 원인
