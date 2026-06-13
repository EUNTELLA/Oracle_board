# Web 프로그램 재구현 시험 문제

이 문서는 기존 `web` 프로그램을 참고하지 않고, 시험처럼 처음부터 다시 만들어 보기 위한 문제지이다.

정답 코드는 포함하지 않는다. 각 문제의 요구사항을 보고 직접 파일을 만들고 기능을 구현한다.

---

## 시험 목표

Express, EJS, Oracle DB, jQuery AJAX, Handlebars를 사용하여 학사 관리 및 게시판 웹 프로그램을 구현한다.

구현해야 할 기능:

1. Express 웹 서버 구성
2. Oracle DB 연결
3. 공통 레이아웃 구성
4. 로그인 기능
5. 메뉴바 로그인/로그아웃 처리
6. 교수 목록/등록/삭제
7. 학생 목록/등록/삭제
8. 게시글 목록/검색/페이징
9. 게시글 등록/상세조회/수정화면/삭제

---

## 기본 조건

1. 프로젝트 폴더는 `web`으로 만든다.
2. View Engine은 `EJS`를 사용한다.
3. 서버는 Express로 구성한다.
4. Oracle DB 접속은 `node-oracledb`를 사용한다.
5. 화면의 목록 출력은 AJAX와 Handlebars를 사용한다.
6. 로그인 정보는 서버 세션이 아니라 브라우저 `sessionStorage`에 저장한다.
7. DB 변경 작업은 `autoCommit: true`를 사용한다.
8. DB 연결은 사용 후 반드시 닫는다.

---

## 요구 파일 구조

다음 구조가 되도록 파일을 만든다.

```text
web/
├── app.js
├── connect.js
├── package.json
├── bin/
│   └── www
├── routes/
│   ├── index.js
│   ├── users.js
│   ├── haksa.js
│   └── posts.js
├── views/
│   ├── index.ejs
│   ├── home.ejs
│   ├── menubar.ejs
│   ├── bottom.ejs
│   ├── login.ejs
│   ├── error.ejs
│   ├── haksa/
│   │   ├── professors.ejs
│   │   ├── professors_insert.ejs
│   │   ├── students.ejs
│   │   ├── students_insert.ejs
│   │   └── course.ejs
│   └── board/
│       ├── list.ejs
│       ├── insert.ejs
│       ├── read.ejs
│       └── update.ejs
└── public/
    ├── images/
    └── stylesheets/
        └── style.css
```

---

## 문제 1. Express 기본 서버 구성

다음 조건을 만족하도록 `app.js`를 작성하시오.

1. Express 앱을 생성한다.
2. `views` 폴더를 EJS 화면 폴더로 설정한다.
3. View Engine을 `ejs`로 설정한다.
4. JSON 요청을 받을 수 있도록 설정한다.
5. URL encoded form 데이터를 받을 수 있도록 설정한다.
6. `public` 폴더를 정적 파일 경로로 설정한다.
7. 다음 라우터를 연결한다.

| URL Prefix | Router File |
|---|---|
| `/` | `routes/index.js` |
| `/users` | `routes/users.js` |
| `/haksa` | `routes/haksa.js` |
| `/board` | `routes/posts.js` |

---

## 문제 2. 서버 실행 파일 구성

`bin/www` 파일을 작성하시오.

조건:

1. `app.js`를 불러온다.
2. 기본 포트는 `3000`으로 한다.
3. Express 앱을 실행한다.
4. 브라우저에서 `http://localhost:3000`으로 접속할 수 있어야 한다.

---

## 문제 3. Oracle DB 연결 함수 작성

`connect.js` 파일을 작성하시오.

조건:

1. `oracledb` 모듈을 불러온다.
2. `getConnection()` 비동기 함수를 만든다.
3. 다음 정보로 Oracle DB에 접속한다.

| 항목 | 값 |
|---|---|
| user | `board` |
| password | `1234` |
| connectionString | `localhost:1521/XEPDB1` |

4. 다른 파일에서 `getConnection`을 사용할 수 있도록 내보낸다.

---

## 문제 4. 공통 레이아웃 만들기

`views/index.ejs`를 작성하시오.

조건:

1. Bootstrap CSS를 사용할 수 있게 한다.
2. jQuery를 사용할 수 있게 한다.
3. Handlebars를 사용할 수 있게 한다.
4. `menubar.ejs`를 포함한다.
5. 전달받은 `pageName` 화면을 본문에 포함한다.
6. `bottom.ejs`를 포함한다.

---

## 문제 5. 메인 화면 구현

`routes/index.js`와 `views/home.ejs`를 작성하시오.

조건:

1. `GET /` 요청 시 메인 화면을 출력한다.
2. `res.render()`를 사용한다.
3. 공통 레이아웃 `index.ejs` 안에 `home.ejs`가 출력되도록 한다.

---

## 문제 6. 메뉴바 구현

`views/menubar.ejs`를 작성하시오.

조건:

1. 홈으로 이동하는 메뉴를 만든다.
2. 교수 관리로 이동하는 메뉴를 만든다.
3. 학생 관리로 이동하는 메뉴를 만든다.
4. 강좌 관리로 이동하는 메뉴를 만든다.
5. 게시판으로 이동하는 메뉴를 만든다.
6. 로그인 페이지로 이동하는 메뉴를 만든다.
7. 로그아웃 버튼을 만든다.
8. `sessionStorage`에 `scode`, `sname`이 있으면 로그인 상태로 표시한다.
9. 로그인 상태에서는 사용자 이름과 학번을 표시한다.
10. 로그아웃 클릭 시 `sessionStorage`를 비우고 메인 화면으로 이동한다.

---

## 문제 7. 로그인 화면 구현

`routes/users.js`와 `views/login.ejs`를 작성하시오.

화면 조건:

1. 학번 입력 칸을 만든다.
2. 비밀번호 입력 칸을 만든다.
3. 로그인 버튼을 만든다.
4. form submit 기본 동작을 막는다.
5. AJAX로 `/users/login`에 POST 요청을 보낸다.

서버 조건:

1. `POST /users/login` 요청을 처리한다.
2. `req.body.scode`로 학번을 받는다.
3. `students` 테이블에서 해당 학번의 학생 정보를 조회한다.
4. 조회 결과 첫 번째 행을 응답한다.
5. 화면에서는 비밀번호가 맞으면 `sessionStorage`에 `scode`, `sname`을 저장한다.
6. 로그인 성공 후 메인 화면으로 이동한다.
7. 로그인 전 이동하려던 페이지가 있으면 해당 페이지로 이동한다.

---

## 문제 8. 교수 목록 화면 구현

`routes/haksa.js`와 `views/haksa/professors.ejs`를 작성하시오.

조건:

1. `GET /haksa/pro` 요청 시 교수 관리 화면을 출력한다.
2. `GET /haksa/pro/list.json` 요청 시 교수 목록 데이터를 JSON으로 응답한다.
3. 교수 목록은 AJAX로 가져온다.
4. 교수 목록은 Handlebars 템플릿으로 테이블에 출력한다.
5. 목록에는 교수번호, 교수명, 학과, 직급, 입사일, 급여, 삭제 버튼을 표시한다.

---

## 문제 9. 교수 등록 기능 구현

`views/haksa/professors_insert.ejs`를 작성하고 `routes/haksa.js`에 기능을 추가하시오.

조건:

1. `GET /haksa/pro/insert` 요청 시 교수 등록 화면을 출력한다.
2. 새 교수 번호는 기존 교수 번호의 최댓값보다 1 큰 값으로 준비한다.
3. 교수명, 학과, 직급, 입사일, 급여를 입력받는다.
4. AJAX로 `POST /haksa/pro/insert` 요청을 보낸다.
5. 서버는 `professors` 테이블에 교수 정보를 등록한다.
6. 등록 성공 후 교수 목록 화면으로 이동한다.

---

## 문제 10. 교수 삭제 기능 구현

`routes/haksa.js`와 `views/haksa/professors.ejs`에 삭제 기능을 추가하시오.

조건:

1. 교수 목록 각 행에 삭제 버튼을 둔다.
2. 삭제 버튼 클릭 시 교수 번호를 가져온다.
3. AJAX로 `POST /haksa/pro/delete` 요청을 보낸다.
4. 서버는 해당 교수 번호의 데이터를 삭제한다.
5. 삭제 성공 후 교수 목록을 다시 조회한다.

---

## 문제 11. 학생 목록 화면 구현

`views/haksa/students.ejs`를 작성하고 `routes/haksa.js`에 기능을 추가하시오.

조건:

1. `GET /haksa/stu` 요청 시 학생 관리 화면을 출력한다.
2. `GET /haksa/stu/list.json` 요청 시 학생 목록 데이터를 JSON으로 응답한다.
3. 학생 목록은 `view_students`에서 조회한다.
4. 학생 목록은 AJAX로 가져온다.
5. 학생 목록은 Handlebars 템플릿으로 테이블에 출력한다.
6. 목록에는 학번, 이름, 학과, 생일, 학년, 지도교수, 삭제 버튼을 표시한다.

---

## 문제 12. 학생 등록 기능 구현

`views/haksa/students_insert.ejs`를 작성하고 `routes/haksa.js`에 기능을 추가하시오.

조건:

1. `GET /haksa/stu/insert` 요청 시 학생 등록 화면을 출력한다.
2. 새 학번은 기존 학번의 최댓값보다 1 큰 값으로 준비한다.
3. 학생명, 학과, 생일, 학년, 지도교수를 입력받는다.
4. AJAX로 `POST /haksa/stu/insert` 요청을 보낸다.
5. 서버는 `students` 테이블에 학생 정보를 등록한다.
6. 생일은 Oracle `to_date()`를 사용하여 저장한다.
7. 등록 성공 후 학생 목록 화면으로 이동한다.

---

## 문제 13. 학생 삭제 기능 구현

`routes/haksa.js`와 `views/haksa/students.ejs`에 삭제 기능을 추가하시오.

조건:

1. 학생 목록 각 행에 삭제 버튼을 둔다.
2. 삭제 버튼 클릭 시 학번을 가져온다.
3. AJAX로 `POST /haksa/stu/delete` 요청을 보낸다.
4. 서버는 해당 학번의 데이터를 삭제한다.
5. 삭제 성공 후 학생 목록을 다시 조회한다.

---

## 문제 14. 강좌 화면 구현

`views/haksa/course.ejs`를 작성하고 `routes/haksa.js`에 기능을 추가하시오.

조건:

1. `GET /haksa/cou` 요청 시 강좌 관리 화면을 출력한다.
2. 화면 제목이 강좌 관리임을 알 수 있게 구성한다.
3. 세부 CRUD 기능은 구현하지 않아도 된다.

---

## 문제 15. 게시글 목록 화면 구현

`routes/posts.js`와 `views/board/list.ejs`를 작성하시오.

조건:

1. `GET /board` 요청 시 게시글 목록 화면을 출력한다.
2. `GET /board/list.json` 요청 시 게시글 목록 데이터를 JSON으로 응답한다.
3. 게시글 목록은 `view_posts`에서 조회한다.
4. 최신 글이 먼저 보이도록 정렬한다.
5. 한 페이지당 5개씩 출력한다.
6. `page`, `size`, `word` 값을 query string으로 받는다.
7. 제목, 내용, 작성자 이름 중 `word`가 포함된 글을 검색한다.
8. 전체 글 개수를 함께 응답한다.
9. 화면에는 이전/다음 버튼과 현재 페이지 정보를 표시한다.
10. 게시글 제목 클릭 시 상세 화면으로 이동한다.

---

## 문제 16. 게시글 등록 화면 구현

`views/board/insert.ejs`를 작성하고 `routes/posts.js`에 기능을 추가하시오.

조건:

1. `GET /board/insert` 요청 시 글쓰기 화면을 출력한다.
2. 로그인하지 않은 사용자가 글쓰기 버튼을 누르면 로그인 화면으로 이동한다.
3. 로그인 후 다시 글쓰기 화면으로 돌아올 수 있도록 처리한다.
4. 제목과 내용을 입력받는다.
5. 작성자는 `sessionStorage`의 `scode`를 사용한다.
6. AJAX로 `POST /board/insert` 요청을 보낸다.
7. 서버는 `posts` 테이블에 게시글을 등록한다.
8. 게시글 번호는 시퀀스를 사용한다.
9. 등록일은 `sysdate`를 사용한다.
10. 등록 성공 후 게시글 목록 화면으로 이동한다.

---

## 문제 17. 게시글 상세 화면 구현

`views/board/read.ejs`를 작성하고 `routes/posts.js`에 기능을 추가하시오.

조건:

1. `GET /board/view/:id` 요청 시 게시글 상세 화면을 출력한다.
2. 주소의 `:id` 값을 사용하여 게시글을 조회한다.
3. 게시글은 `view_posts`에서 조회한다.
4. 제목, 내용, 작성일, 작성자 이름을 출력한다.
5. 줄바꿈이 유지되도록 내용을 출력한다.
6. 작성자 본인에게만 수정/삭제 버튼을 보여준다.

---

## 문제 18. 게시글 삭제 기능 구현

`views/board/read.ejs`와 `routes/posts.js`에 삭제 기능을 추가하시오.

조건:

1. 삭제 버튼 클릭 시 확인 창을 띄운다.
2. AJAX로 `POST /board/delete` 요청을 보낸다.
3. 서버는 해당 게시글 번호의 데이터를 삭제한다.
4. 삭제 성공 후 게시글 목록 화면으로 이동한다.

---

## 문제 19. 게시글 수정 화면 구현

`views/board/update.ejs`를 작성하고 `routes/posts.js`에 기능을 추가하시오.

조건:

1. `GET /board/update/:id` 요청 시 게시글 수정 화면을 출력한다.
2. 주소의 `:id` 값을 사용하여 기존 게시글을 조회한다.
3. 제목과 내용 입력 칸에 기존 값을 출력한다.
4. 저장 버튼과 취소 버튼을 만든다.
5. 취소 버튼 클릭 시 상세 화면으로 돌아간다.

---

## 문제 20. 게시글 수정 처리 구현

`routes/posts.js`에 게시글 수정 처리 기능을 추가하시오.

조건:

1. AJAX로 게시글 번호, 제목, 내용을 서버에 보낸다.
2. 서버는 `posts` 테이블에서 해당 게시글을 수정한다.
3. 수정 성공 후 상세 화면으로 이동한다.
4. 작성자가 아닌 사용자는 화면에서 수정 버튼을 볼 수 없어야 한다.

---

## 문제 21. 에러 처리

`views/error.ejs`와 `app.js`의 에러 처리를 구성하시오.

조건:

1. 존재하지 않는 경로로 접속하면 404 에러를 처리한다.
2. 서버 오류가 발생하면 500 상태를 처리한다.
3. 개발 중에는 오류 메시지를 확인할 수 있게 한다.

---

## 문제 22. 최종 동작 확인

다음 항목을 직접 확인하시오.

| 확인 항목 | 결과 |
|---|---|
| `/` 접속 시 홈 화면이 보이는가 |  |
| `/users/login` 접속 시 로그인 화면이 보이는가 |  |
| 로그인 성공 시 사용자 정보가 메뉴에 보이는가 |  |
| 로그아웃 시 사용자 정보가 사라지는가 |  |
| 교수 목록이 출력되는가 |  |
| 교수 등록이 되는가 |  |
| 교수 삭제가 되는가 |  |
| 학생 목록이 출력되는가 |  |
| 학생 등록이 되는가 |  |
| 학생 삭제가 되는가 |  |
| 게시글 목록이 출력되는가 |  |
| 게시글 검색이 되는가 |  |
| 게시글 페이징이 되는가 |  |
| 게시글 등록이 되는가 |  |
| 게시글 상세 조회가 되는가 |  |
| 작성자에게만 수정/삭제 버튼이 보이는가 |  |
| 게시글 삭제가 되는가 |  |
| 게시글 수정 화면이 보이는가 |  |
| 게시글 수정 처리가 되는가 |  |

---

## 제출 조건

1. `web` 폴더 안의 모든 파일이 정상적으로 실행되어야 한다.
2. `npm start` 또는 `npx nodemon`으로 서버를 실행할 수 있어야 한다.
3. 브라우저에서 `http://localhost:3000` 접속이 가능해야 한다.
4. 콘솔에 치명적인 오류가 없어야 한다.
5. Oracle DB 연결 오류가 없어야 한다.
6. 등록, 수정, 삭제 후 DB에 실제로 반영되어야 한다.

---

## 제한 사항

1. 정답 코드를 보지 않고 직접 작성한다.
2. 기능별로 하나씩 구현하고 바로 테스트한다.
3. 오류가 발생하면 브라우저 콘솔, 터미널 로그, Oracle 오류 메시지를 확인한다.
4. SQL 문자열을 만들 때 가능한 바인드 변수를 사용한다.
5. 같은 기능을 복사하더라도 URL, 파일명, 변수명을 현재 기능에 맞게 수정한다.

