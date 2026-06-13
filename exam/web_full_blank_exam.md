# Web 전체 기능 빈칸 시험 대비 자료

이 자료는 현재 `web` 프로젝트 기준으로 정리한 프린트용 시험 대비 자료이다.

범위:

1. Express 기본 구조
2. EJS 화면 렌더링
3. Oracle DB 연결
4. 로그인과 sessionStorage
5. 메뉴바 로그인/로그아웃 처리
6. 학생 관리
7. 교수 관리
8. 게시판 CRUD
9. 동기/비동기 처리
10. SQL 조회, 등록, 삭제

---

## 1. 전체 파일 구조

| 역할 | 파일 |
|---|---|
| Express 앱 설정 | `web/app.js` |
| 서버 실행 | `web/bin/www` |
| DB 연결 | `web/connect.js` |
| 메인 라우터 | `web/routes/index.js` |
| 로그인 라우터 | `web/routes/users.js` |
| 학사 라우터 | `web/routes/haksa.js` |
| 게시판 라우터 | `web/routes/posts.js` |
| 공통 레이아웃 | `web/views/index.ejs` |
| 메뉴 | `web/views/menubar.ejs` |
| 로그인 화면 | `web/views/login.ejs` |
| 게시판 화면 | `web/views/board/*.ejs` |
| 학사 화면 | `web/views/haksa/*.ejs` |

---

## 2. 기능별 처리 방식

| 기능 | 요청 주소 | 서버 파일 | 화면 파일 | 처리 방식 |
|---|---|---|---|---|
| 홈 | `GET /` | `index.js` | `home.ejs` | 동기 렌더링 |
| 로그인 화면 | `GET /users/login` | `users.js` | `login.ejs` | 동기 렌더링 |
| 로그인 체크 | `POST /users/login` | `users.js` | `login.ejs` | AJAX 비동기 |
| 교수 목록 화면 | `GET /haksa/pro` | `haksa.js` | `professors.ejs` | 동기 렌더링 |
| 교수 목록 데이터 | `GET /haksa/pro/list.json` | `haksa.js` | `professors.ejs` | AJAX 비동기 |
| 교수 등록 화면 | `GET /haksa/pro/insert` | `haksa.js` | `professors_insert.ejs` | 동기 렌더링 |
| 교수 등록 | `POST /haksa/pro/insert` | `haksa.js` | `professors_insert.ejs` | AJAX 비동기 |
| 교수 삭제 | `POST /haksa/pro/delete` | `haksa.js` | `professors.ejs` | AJAX 비동기 |
| 학생 목록 화면 | `GET /haksa/stu` | `haksa.js` | `students.ejs` | 동기 렌더링 |
| 학생 목록 데이터 | `GET /haksa/stu/list.json` | `haksa.js` | `students.ejs` | AJAX 비동기 |
| 학생 등록 화면 | `GET /haksa/stu/insert` | `haksa.js` | `students_insert.ejs` | 동기 렌더링 |
| 학생 등록 | `POST /haksa/stu/insert` | `haksa.js` | `students_insert.ejs` | AJAX 비동기 |
| 학생 삭제 | `POST /haksa/stu/delete` | `haksa.js` | `students.ejs` | AJAX 비동기 |
| 게시판 목록 화면 | `GET /board` | `posts.js` | `board/list.ejs` | 동기 렌더링 |
| 게시판 목록 데이터 | `GET /board/list.json` | `posts.js` | `board/list.ejs` | AJAX 비동기 |
| 게시글 등록 화면 | `GET /board/insert` | `posts.js` | `board/insert.ejs` | 동기 렌더링 |
| 게시글 등록 | `POST /board/insert` | `posts.js` | `board/insert.ejs` | AJAX 비동기 |
| 게시글 상세 | `GET /board/view/:id` | `posts.js` | `board/read.ejs` | 동기 렌더링 |
| 게시글 삭제 | `POST /board/delete` | `posts.js` | `board/read.ejs` | AJAX 비동기 |
| 게시글 수정 화면 | `GET /board/update/:id` | `posts.js` | `board/update.ejs` | 동기 렌더링 |

---

## 3. 요청 데이터 구분

| 코드 | 사용 상황 | 예시 |
|---|---|---|
| `req.params` | 주소 경로에 포함된 값 | `/board/view/3` |
| `req.query` | 주소 뒤의 검색 조건 | `/board/list.json?page=1&size=5` |
| `req.body` | POST로 보낸 데이터 | `data: { title, content }` |

```javascript
const id = req.params.id;
const page = req.query.page;
const title = req.body.title;
```

---

# 빈칸 문제

## 문제 1. Express 앱 기본 설정

```javascript
var express = require('express');
var path = require('path');

var app = express();

app.set('views', path.join(__dirname, '____'));
app.set('view engine', '____');

app.use(express.json());
app.use(express.____({ extended: false }));
app.use(express.static(path.join(__dirname, '____')));
```

정답

1. `views`
2. `ejs`
3. `urlencoded`
4. `public`

## 문제 2. 라우터 연결

```javascript
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/haksa', require('./routes/____'));
app.use('/board', require('./routes/____'));
```

정답

1. `haksa`
2. `posts`

## 문제 3. 라우터 생성과 내보내기

```javascript
var express = require('express');
var router = express.____();

router.get('/', function (req, res, next) {
    res.render('index', { title: 'home', pageName: 'home' });
});

module.exports = ____;
```

정답

1. `Router`
2. `router`

## 문제 4. Oracle DB 연결

```javascript
const oracledb = require('oracledb');

async function getConnection() {
    let connection;
    try {
        connection = await oracledb.____({
            user: 'board',
            password: '1234',
            connectionString: 'localhost:1521/XEPDB1'
        });
        return connection;
    } catch (err) {
        throw err;
    }
}

module.exports = { ____ };
```

정답

1. `getConnection`
2. `getConnection`

## 문제 5. DB 처리 기본 구조

```javascript
let con;
try {
    con = await getConnection();
    const result = await con.____(sql, bindData, {
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    res.send(result.rows);
} catch (err) {
    res.sendStatus(500);
} finally {
    if (con) await con.____();
}
```

정답

1. `execute`
2. `close`

## 문제 6. 로그인 화면 렌더링

```javascript
router.get('/login', function (req, res, next) {
    res.____('index', {
        title: '로그인',
        pageName: "____"
    });
});
```

정답

1. `render`
2. `login`

## 문제 7. 로그인 AJAX

```javascript
$(frm).on("submit", function (e) {
    e.____();

    const scode = $(frm.scode).val();
    const pass = $(frm.pass).val();

    $.ajax({
        type: "____",
        url: "/users/____",
        data: { scode, pass },
        success: function (data) {
            if (!data) {
                alert("해당 학번이 없습니다.");
            } else if (data.PASS != pass) {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                sessionStorage.setItem("sname", data.____);
                sessionStorage.setItem("scode", data.____);
                location.href = "/";
            }
        }
    });
});
```

정답

1. `preventDefault`
2. `post`
3. `login`
4. `SNAME`
5. `SCODE`

## 문제 8. 로그인 서버 처리

```javascript
router.post('/login', async function (req, res) {
    const scode = req.____.scode;
    const pass = req.body.pass;

    let con;
    try {
        con = await getConnection();
        let sql = "select * from students where scode=:scode";
        let result = await con.execute(sql, { ____ }, {
            outFormat: OracleDB.____
        });
        res.____(result.rows[0]);
    } finally {
        if (con) await con.close();
    }
});
```

정답

1. `body`
2. `scode`
3. `OUT_FORMAT_OBJECT`
4. `send`

## 문제 9. 메뉴바 로그인 상태 표시

```javascript
const scode = sessionStorage.getItem("____");
const sname = sessionStorage.getItem("____");

if (!scode) {
    $(".login").____();
    $(".logout").hide();
} else {
    $(".login").hide();
    $(".logout").____();
    $(".sname").html(`${sname}(${scode})`);
}
```

정답

1. `scode`
2. `sname`
3. `show`
4. `show`

## 문제 10. 로그아웃

```javascript
$(".logout-btn").on("click", function (e) {
    e.preventDefault();
    if (confirm("로그아웃 하시겠습니까?")) {
        sessionStorage.____();
        location.href = "____";
    }
});
```

정답

1. `clear`
2. `/`

## 문제 11. 교수 목록 화면

```javascript
router.get('/pro', function (req, res, next) {
    res.render('index', {
        title: '교수관리',
        pageName: 'haksa/____.ejs'
    });
});
```

정답

1. `professors`

## 문제 12. 교수 목록 데이터 조회

```javascript
router.get('/pro/list.json', async function (req, res) {
    let con;
    try {
        con = await getConnection();
        const sql = "select p.*, to_char(hiredate, 'YYYY-MM-DD') fdate, to_char(salary, '99,999,999') fsalary from professors p";
        const result = await con.execute(sql, {}, {
            outFormat: oracledb.____
        });
        res.____(result.rows);
    } finally {
        if (con) await con.close();
    }
});
```

정답

1. `OUT_FORMAT_OBJECT`
2. `send`

## 문제 13. 교수 목록 AJAX 출력

```javascript
function getList() {
    $.ajax({
        type: "____",
        url: "/haksa/pro/____.json",
        success: function (data) {
            const temp = Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(____));
        }
    });
}
```

정답

1. `get`
2. `list`
3. `data`

## 문제 14. 교수 삭제

```javascript
$("#tbl").on("click", ".delete", function () {
    const pcode = $(this).data("____");

    $.ajax({
        type: "post",
        url: "/haksa/pro/____",
        data: { pcode: ____ },
        success: function () {
            getList();
        }
    });
});
```

정답

1. `pcode`
2. `delete`
3. `pcode`

## 문제 15. 교수 등록 화면에서 새 코드 조회

```javascript
router.get('/pro/insert', async function (req, res) {
    let con;
    let newcode = '';
    try {
        con = await getConnection();
        const sql = "select nvl(max(pcode), 0) + 1 code from professors";
        const result = await con.execute(sql);
        newcode = result.rows[0][____];
    } finally {
        res.render('index', {
            title: '교수등록',
            pageName: 'haksa/professors_insert',
            code: ____
        });
        if (con) await con.close();
    }
});
```

정답

1. `0`
2. `newcode`

## 문제 16. 학생 목록 화면

```javascript
router.get('/stu', function (req, res, next) {
    res.render('index', {
        title: '학생관리',
        pageName: 'haksa/____.ejs'
    });
});
```

정답

1. `students`

## 문제 17. 학생 목록 데이터 조회

```javascript
router.get('/stu/list.json', async function (req, res) {
    let con;
    try {
        con = await getConnection();
        let sql = "select * from ____";
        const result = await con.execute(sql, {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        res.send(result.____);
    } finally {
        if (con) await con.close();
    }
});
```

정답

1. `view_students`
2. `rows`

## 문제 18. 학생 목록 AJAX 출력

```javascript
function getList() {
    $.ajax({
        type: "get",
        url: "/haksa/stu/____.json",
        success: function (data) {
            const temp = Handlebars.compile($("#temp_students").html());
            $("#tbl_students").html(temp(____));
        }
    });
}
```

정답

1. `list`
2. `data`

## 문제 19. 학생 등록 화면에서 새 학번 조회

```javascript
router.get('/stu/insert', async function (req, res) {
    let con;
    let code;
    try {
        con = await getConnection();
        const sql = "select max(scode)+1 from students";
        const result = await con.execute(sql);
        code = result.rows[0][____];
    } finally {
        if (con) await con.close();
    }

    res.render('index', {
        title: '학생입력',
        pageName: 'haksa/____.ejs',
        code
    });
});
```

정답

1. `0`
2. `students_insert`

## 문제 20. 학생 등록 AJAX

```javascript
$(frm).on("submit", function (e) {
    e.preventDefault();

    const scode = $(frm.scode).val();
    const sname = $(frm.sname).val();
    const dept = $(frm.dept).val();
    const birthday = $(frm.birthday).val();
    const year = $(frm.year).val();
    const pcode = $(frm.pcode).val();

    $.ajax({
        type: "____",
        url: "/haksa/stu/____",
        data: { scode, sname, dept, birthday, year, pcode },
        success: function () {
            location.href = "/haksa/____";
        }
    });
});
```

정답

1. `post`
2. `insert`
3. `stu`

## 문제 21. 학생 등록 SQL

```javascript
router.post('/stu/insert', async function (req, res) {
    const scode = req.body.scode;
    const sname = req.body.sname;
    const dept = req.body.dept;
    const birthday = req.body.birthday;
    const year = req.body.year;
    const pcode = req.body.pcode;

    let sql = 'insert into students(scode, sname, dept, birthday, year, advisor) ';
    sql += `values(:scode, :sname, :dept, to_date(:birthday,'YYYY-MM-DD'), :year, :pcode)`;

    await con.execute(sql, {
        scode, sname, dept, birthday, year, ____
    }, {
        ____: true
    });
});
```

정답

1. `pcode`
2. `autoCommit`

## 문제 22. 학생 삭제

```javascript
router.post('/stu/delete', async function (req, res) {
    const scode = req.____.scode;

    const sql = 'delete from students where scode = :scode';
    await con.execute(sql, {
        scode: ____
    }, {
        autoCommit: true
    });

    res.sendStatus(200);
});
```

정답

1. `body`
2. `scode`

## 문제 23. 게시판 목록 화면

```javascript
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '게시판',
        pageName: 'board/____.ejs'
    });
});
```

정답

1. `list`

## 문제 24. 게시판 목록 데이터와 페이징

```javascript
router.get('/list.json', async function (req, res) {
    let page = Number(req.____.page) || 1;
    let size = Number(req.query.size) || 5;
    let word = req.query.word || "";
    let offset_rows = (page - 1) * size;

    let sql = "select * from view_posts ";
    sql += "order by id desc ";
    sql += `offset ${offset_rows} rows fetch next ${size} rows only`;

    let result = await con.execute(sql, {}, {
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });

    let list = result.____;

    sql = "select count(*) from view_posts";
    result = await con.execute(sql);
    let count = result.rows[0][____];

    res.send({ list, count });
});
```

정답

1. `query`
2. `rows`
3. `0`

## 문제 25. 게시판 목록 Handlebars 출력

```javascript
const temp = Handlebars.____($("#temp").html());
$("#tbl").____(temp(data.list));

const last = Math.ceil(data.count / size);
$("#page_info").html(`${page}/${last}`);
```

정답

1. `compile`
2. `html`

## 문제 26. 게시글 등록

```javascript
router.post('/insert', async function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;

    let sql = "insert into posts(id, title, content, writer, reg_date) ";
    sql += "values(post_id.nextval, :title, :content, :writer, sysdate)";

    await con.execute(sql, {
        title, content, writer
    }, {
        autoCommit: ____
    });

    res.sendStatus(____);
});
```

정답

1. `true`
2. `200`

## 문제 27. 게시글 상세 보기

```javascript
router.get('/view/:id', async function (req, res) {
    const id = req.____.id;

    let sql = "select * from view_posts where id = :id";
    let result = await con.execute(sql, { id }, {
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });

    let post = result.rows[____];

    res.render('index', {
        title: '게시글 정보',
        pageName: 'board/____.ejs',
        post
    });
});
```

정답

1. `params`
2. `0`
3. `read`

## 문제 28. 게시글 삭제

```javascript
$(".btn-delete").on("click", function () {
    $.ajax({
        type: "____",
        url: "/board/____",
        data: { id },
        success: function () {
            location.href = "/board";
        }
    });
});
```

정답

1. `post`
2. `delete`

## 문제 29. 게시글 삭제 서버 SQL

```javascript
router.post('/delete', async function (req, res) {
    const id = req.body.id;

    let sql = "delete from posts where id = :id";
    await con.execute(sql, { ____ }, {
        autoCommit: true
    });

    res.sendStatus(200);
});
```

정답

1. `id`

## 문제 30. 게시글 수정 화면

```javascript
router.get('/update/:id', async function (req, res) {
    const id = req.params.id;

    let sql = "select * from view_posts where id = :id";
    let result = await con.execute(sql, { id }, {
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });

    let post = result.rows[0];

    res.render('index', {
        title: '게시글 수정',
        pageName: 'board/____.ejs',
        post
    });
});
```

정답

1. `update`

## 문제 31. EJS 값 출력

```ejs
<input value="<%=post.____%>" name="title">
<textarea name="content"><%=post.____%></textarea>

<div class="card-header">
    <%=post.____%>
</div>
```

정답

1. `TITLE`
2. `CONTENT`
3. `TITLE`

## 문제 32. 작성자만 수정/삭제 버튼 표시

```javascript
const writer = $(".writer").html();
const id = "<%=post.ID%>";

if (writer == ____) {
    $(".btn-modify").show();
} else {
    $(".btn-modify").____();
}
```

정답

1. `sname`
2. `hide`

---

# SQL 빈칸 문제

## 문제 33. 학생 조회

```sql
select * from ____;
```

정답

1. `view_students`

## 문제 34. 교수 조회

```sql
select p.*,
       to_char(hiredate, 'YYYY-MM-DD') fdate,
       to_char(salary, '99,999,999') fsalary
from ____ p;
```

정답

1. `professors`

## 문제 35. 로그인 학생 조회

```sql
select * from students where scode = :____;
```

정답

1. `scode`

## 문제 36. 학생 등록

```sql
insert into students(scode, sname, dept, birthday, year, advisor)
values(:scode, :sname, :dept, to_date(:birthday, 'YYYY-MM-DD'), :year, :____);
```

정답

1. `pcode`

## 문제 37. 게시글 등록

```sql
insert into posts(id, title, content, writer, reg_date)
values(post_id.____, :title, :content, :writer, sysdate);
```

정답

1. `nextval`

## 문제 38. 게시글 상세 조회

```sql
select * from view_posts where id = :____;
```

정답

1. `id`

## 문제 39. 게시글 삭제

```sql
delete from posts where id = :____;
```

정답

1. `id`

## 문제 40. 페이징 조회

```sql
select * from view_posts
order by id desc
offset 0 rows fetch next 5 rows only;
```

빈칸:

```sql
select * from view_posts
order by id ____
offset 0 rows fetch next 5 rows only;
```

정답

1. `desc`

---

# 최종 암기 포인트

1. 화면 이동/화면 출력은 `res.render()`를 사용한다.
2. AJAX 데이터 응답은 `res.send()`를 사용한다.
3. 성공/실패 상태만 보낼 때는 `res.sendStatus(200)`, `res.sendStatus(500)`을 사용한다.
4. `GET /주소`는 보통 화면 렌더링이다.
5. `GET /주소/list.json`은 보통 AJAX 목록 조회이다.
6. `POST /주소/insert`는 등록 처리이다.
7. `POST /주소/delete`는 삭제 처리이다.
8. 주소의 `:id`는 `req.params.id`로 받는다.
9. query string은 `req.query`로 받는다.
10. POST 데이터는 `req.body`로 받는다.
11. DB 연결은 `await getConnection()`이다.
12. SQL 실행은 `await con.execute()`이다.
13. 조회 결과는 `result.rows`에 들어간다.
14. 객체 형태 조회는 `oracledb.OUT_FORMAT_OBJECT`를 사용한다.
15. 등록/수정/삭제는 `{ autoCommit: true }`가 필요하다.
16. DB 연결은 `finally`에서 `con.close()`로 닫는다.
17. 로그인 정보는 서버 세션이 아니라 브라우저 `sessionStorage`에 저장한다.
18. `sessionStorage.setItem()`은 저장, `sessionStorage.getItem()`은 읽기, `sessionStorage.clear()`는 삭제이다.
19. Handlebars는 `Handlebars.compile()`로 템플릿을 만든다.
20. jQuery의 `html()`은 선택한 요소 내부 HTML을 변경한다.

---

# 주의할 점

현재 프로젝트의 일부 주석과 화면 글자는 글자 인코딩 문제로 깨져 보이지만, 시험에서 중요한 것은 코드 흐름이다.

특히 다음 흐름을 반드시 외운다.

```text
브라우저 이벤트
-> $.ajax()
-> Express router
-> req.body / req.query / req.params
-> getConnection()
-> con.execute()
-> res.send() 또는 res.sendStatus()
-> success 함수 실행
```

동기 렌더링 흐름:

```text
브라우저 주소 이동
-> Express router
-> res.render()
-> EJS 화면 출력
```
