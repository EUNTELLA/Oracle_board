# Web 학사 관리 복습 목차

웹 학사 관리에서 사용한 개념을 기능별로 나눈 복습 노트입니다.

## 추천 읽는 순서

1. [Express 라우터](web/01_express_router.md)
2. [EJS 레이아웃](web/02_ejs_layout.md)
3. [Ajax와 Handlebars](web/03_ajax_handlebars.md)
4. [Oracle DB 연결](web/04_oracle_connection.md)
5. [CRUD 라우트 흐름](web/05_crud_routes.md)
6. [Oracle View](web/06_oracle_view.md)
7. [자주 발생한 오류](web/07_errors.md)
8. [게시판 SQL 정리](web/09_board_sql.md)

## 빠르게 찾기

- 404가 날 때: [Express 라우터](web/01_express_router.md), [자주 발생한 오류](web/07_errors.md)
- 화면 include가 헷갈릴 때: [EJS 레이아웃](web/02_ejs_layout.md)
- 목록 출력이 안 될 때: [Ajax와 Handlebars](web/03_ajax_handlebars.md)
- DB 연결이나 SQL 실행이 헷갈릴 때: [Oracle DB 연결](web/04_oracle_connection.md)
- 등록/삭제 흐름이 헷갈릴 때: [CRUD 라우트 흐름](web/05_crud_routes.md)
- `view_students`를 다시 만들어야 할 때: [Oracle View](web/06_oracle_view.md)
- ORA 에러가 날 때: [자주 발생한 오류](web/07_errors.md)
- 시험에 나올 만한 핵심 개념: [시험 핵심 정리](web/08_exam_concepts.md)
- 게시판 테이블, 뷰, 샘플 데이터가 필요할 때: [게시판 SQL 정리](web/09_board_sql.md)

## 시험 대비 핵심 요약

1. `app.use('/haksa', require('./routes/haksa'))` 때문에 실제 URL은 `/haksa/...`가 된다.
2. `res.render('index', { pageName: 'haksa/students.ejs' })`에서 `pageName`이 정확해야 페이지가 들어간다.
3. Ajax 요청은 비동기이므로 서버 응답 후 `success` 콜백에서 화면을 갱신한다.
4. DB 쿼리는 `await con.execute(sql, bindData, { autoCommit: true })`로 실행하고, `finally`에서 `con.close()` 한다.
5. SQL에 값 넣을 때는 `:scode`, `:pcode` 같은 바인드 변수를 사용하면 안전하다.
6. `express.urlencoded({ extended: false })`가 없으면 POST form 값이 `req.body`에 들어오지 않는다.
7. `view_students`는 students와 professors를 조인한 View이고, `pcode(+)`는 Oracle 외부 조인이다.
