# Web Project Blank-Fill Exam Practice

## 1. 시험 대비 방향

이 프로젝트는 Express, EJS, jQuery AJAX, Oracle DB 연결 흐름을 이해하고 빈칸을 채우는 방식으로 공부하는 것이 좋다.

핵심은 코드를 통째로 외우는 것이 아니라 다음 흐름을 반복해서 복원하는 것이다.

1. 브라우저에서 버튼 또는 폼 제출
2. jQuery 이벤트 실행
3. AJAX 요청 전송
4. Express 라우터에서 요청 처리
5. Oracle DB 연결
6. SQL 실행
7. 결과를 화면 또는 JSON으로 응답

---

## 2. 전체 구조 빈칸

### 문제

```js
var express = require('express');
var router = express.____();
var { getConnection } = require('../____');
var oracledb = require('____');

module.exports = ____;
```

### 정답

```js
var express = require('express');
var router = express.Router();
var { getConnection } = require('../connect');
var oracledb = require('oracledb');

module.exports = router;
```

### 포인트

- `express.Router()`는 라우터 객체를 만든다.
- `getConnection`은 Oracle DB 연결 함수다.
- `oracledb`는 Oracle DB 실행 옵션을 사용할 때 필요하다.
- `module.exports = router`를 해야 `app.js`에서 라우터를 사용할 수 있다.

---

## 3. app.js 라우터 연결

### 문제

```js
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/haksa', require('./routes/____'));
app.use('/board', require('./routes/____'));
```

### 정답

```js
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/haksa', require('./routes/haksa'));
app.use('/board', require('./routes/posts'));
```

### 포인트

- `/board`로 시작하는 요청은 `routes/posts.js`가 처리한다.
- `/haksa`로 시작하는 요청은 `routes/haksa.js`가 처리한다.

---

## 4. Oracle DB 연결

### 문제

```js
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
        console.log('Connect 오류 발생:', err);
        throw err;
    }
}

module.exports = { ____ };
```

### 정답

```js
const oracledb = require('oracledb');

async function getConnection() {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'board',
            password: '1234',
            connectionString: 'localhost:1521/XEPDB1'
        });
        return connection;
    } catch (err) {
        console.log('Connect 오류 발생:', err);
        throw err;
    }
}

module.exports = { getConnection };
```

### 포인트

- Oracle 연결은 `oracledb.getConnection()`으로 만든다.
- 다른 파일에서 쓰려면 `module.exports`로 내보낸다.

---

## 5. 게시글 목록 페이지 이동

### 문제

```js
router.get('/', function (req, res, next) {
    res.____('index', {
        title: '게시글',
        pageName: 'board/____.ejs'
    });
});
```

### 정답

```js
router.get('/', function (req, res, next) {
    res.render('index', {
        title: '게시글',
        pageName: 'board/list.ejs'
    });
});
```

### 포인트

- 화면을 보여줄 때는 `res.render()`를 사용한다.
- 실제 화면 조각은 `board/list.ejs`다.

---

## 6. 게시글 등록 페이지 이동

### 문제

```js
router.____('/insert', function (req, res) {
    res.render('index', {
        title: '글쓰기',
        pageName: 'board/____.ejs'
    });
});
```

### 정답

```js
router.get('/insert', function (req, res) {
    res.render('index', {
        title: '글쓰기',
        pageName: 'board/insert.ejs'
    });
});
```

### 포인트

- 페이지 이동은 보통 `GET` 요청이다.
- 글쓰기 화면은 `insert.ejs`다.

---

## 7. 게시글 등록 처리

### 문제

```js
router.post('/insert', async function (req, res) {
    const title = req.____.title;
    const content = req.body.____;
    const writer = req.body.____;

    let con;
    try {
        con = await ____();
        let sql = "insert into posts(id,title, content, writer,reg_date) ";
        sql += "values(post_id.nextval, :title, :content, :writer,sysdate)";
        await con.____(sql, { title, content, writer }, { autoCommit: ____ });
        res.____(200);
    } catch (err) {
        console.log('게시글 등록', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.____();
    }
});
```

### 정답

```js
router.post('/insert', async function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;

    let con;
    try {
        con = await getConnection();
        let sql = "insert into posts(id,title, content, writer,reg_date) ";
        sql += "values(post_id.nextval, :title, :content, :writer,sysdate)";
        await con.execute(sql, { title, content, writer }, { autoCommit: true });
        res.sendStatus(200);
    } catch (err) {
        console.log('게시글 등록', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

### 포인트

- 폼이나 AJAX로 보낸 데이터는 `req.body`에서 받는다.
- INSERT, UPDATE, DELETE는 `autoCommit: true`가 필요하다.
- 성공 상태만 보낼 때는 `res.sendStatus(200)`을 쓴다.
- DB 연결은 마지막에 `close()` 해야 한다.

---

## 8. 게시글 상세 페이지

### 문제

```js
router.get('/view/:id', async function (req, res) {
    const id = req.____.id;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, {
            outFormat: oracledb.____
        });
        let post = result.____[0];

        res.render('index', {
            title: '게시글 정보',
            pageName: 'board/____.ejs',
            post
        });
    } catch (err) {
        console.log('게시글 상세', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

### 정답

```js
router.get('/view/:id', async function (req, res) {
    const id = req.params.id;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        let post = result.rows[0];

        res.render('index', {
            title: '게시글 정보',
            pageName: 'board/read.ejs',
            post
        });
    } catch (err) {
        console.log('게시글 상세', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

### 포인트

- `/view/:id`의 `id`는 `req.params.id`로 받는다.
- `OUT_FORMAT_OBJECT`를 쓰면 컬럼명을 객체 키로 사용할 수 있다.
- 상세 페이지는 `read.ejs`다.

---

## 9. 게시글 목록 JSON

### 문제

```js
router.get('/list.json', async function (req, res) {
    let page = Number(req.____.page) || 1;
    let size = Number(req.query.____) || 5;
    let word = req.query.word || "";
    let offset_rows = (page - 1) * size;

    let con;
    let list;
    let count;
    try {
        con = await getConnection();
        let sql = "select * from view_posts ";
        sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%' `;
        sql += "order by id desc ";
        sql += `offset ${offset_rows} rows fetch next ${size} rows only`;

        let result = await con.execute(sql, {}, {
            outFormat: oracledb.____
        });
        list = result.____;

        sql = "select count(*) from view_posts ";
        sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%'`;

        result = await con.execute(sql);
        count = result.rows[0][0];
        res.____({ list, count });
    } catch (err) {
        console.log('게시글 데이터', err.message);
    } finally {
        if (con) await con.close();
    }
});
```

### 정답

```js
router.get('/list.json', async function (req, res) {
    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 5;
    let word = req.query.word || "";
    let offset_rows = (page - 1) * size;

    let con;
    let list;
    let count;
    try {
        con = await getConnection();
        let sql = "select * from view_posts ";
        sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%' `;
        sql += "order by id desc ";
        sql += `offset ${offset_rows} rows fetch next ${size} rows only`;

        let result = await con.execute(sql, {}, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        list = result.rows;

        sql = "select count(*) from view_posts ";
        sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%'`;

        result = await con.execute(sql);
        count = result.rows[0][0];
        res.send({ list, count });
    } catch (err) {
        console.log('게시글 데이터', err.message);
    } finally {
        if (con) await con.close();
    }
});
```

### 포인트

- URL 쿼리스트링은 `req.query`로 받는다.
- `/board/list.json?page=1&size=5`에서 `page`, `size`가 query 값이다.
- JSON 응답은 `res.send()`를 사용한다.

---

## 10. 게시글 삭제

### 문제

```js
router.post('/delete', async function (req, res) {
    const id = req.____.id;
    let con;
    try {
        con = await getConnection();
        let sql = "delete from posts where id = :id";
        await con.execute(sql, { id }, { autoCommit: ____ });
        res.sendStatus(____);
    } catch (err) {
        console.log('게시글 삭제', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

### 정답

```js
router.post('/delete', async function (req, res) {
    const id = req.body.id;
    let con;
    try {
        con = await getConnection();
        let sql = "delete from posts where id = :id";
        await con.execute(sql, { id }, { autoCommit: true });
        res.sendStatus(200);
    } catch (err) {
        console.log('게시글 삭제', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

### 포인트

- 삭제할 id는 AJAX data로 오기 때문에 `req.body.id`다.
- DELETE도 DB 변경이므로 `autoCommit: true`가 필요하다.

---

## 11. 글쓰기 EJS Form

### 문제

```html
<form name="____">
    <input name="____" class="form-control mb-3" placeholder="제목을 입력하세요">
    <textarea name="____" class="form-control mb-3" rows="10" placeholder="내용을 입력하세요"></textarea>
    <div class="text-center">
        <button type="____" class="btn btn-primary px-5">저장</button>
        <button type="button" class="btn btn-secondary px-5">취소</button>
    </div>
</form>
```

### 정답

```html
<form name="frm">
    <input name="title" class="form-control mb-3" placeholder="제목을 입력하세요">
    <textarea name="content" class="form-control mb-3" rows="10" placeholder="내용을 입력하세요"></textarea>
    <div class="text-center">
        <button type="submit" class="btn btn-primary px-5">저장</button>
        <button type="button" class="btn btn-secondary px-5">취소</button>
    </div>
</form>
```

### 포인트

- `name="frm"`이면 JavaScript에서 `frm`으로 접근한다.
- `name="title"`, `name="content"`는 서버의 `req.body.title`, `req.body.content`와 연결된다.

---

## 12. 글쓰기 AJAX

### 문제

```js
$(frm).on("submit", function (e) {
    e.____();
    const title = $(frm.title).____();
    const content = $(frm.content).____();

    if (title == "") {
        alert("제목을 꼭 입력하세요");
        frm.title.____();
    } else {
        $.ajax({
            type: "____",
            url: "/board/____",
            data: { title, content, writer: ____ },
            success: function () {
                alert("성공");
                location.href = "/____";
            }
        });
    }
});
```

### 정답

```js
$(frm).on("submit", function (e) {
    e.preventDefault();
    const title = $(frm.title).val();
    const content = $(frm.content).val();

    if (title == "") {
        alert("제목을 꼭 입력하세요");
        frm.title.focus();
    } else {
        $.ajax({
            type: "post",
            url: "/board/insert",
            data: { title, content, writer: scode },
            success: function () {
                alert("성공");
                location.href = "/board";
            }
        });
    }
});
```

### 포인트

- `preventDefault()`는 form의 기본 새로고침 제출을 막는다.
- `.val()`은 input 값을 가져온다.
- `writer: scode`는 로그인한 학생 코드를 글쓴이로 보낸다.

---

## 13. 메뉴바 로그인 상태

### 문제

```js
const scode = sessionStorage.getItem("____");
const sname = sessionStorage.getItem("____");

if (!scode) {
    $(".login").____();
    $(".logout").____();
} else {
    $(".login").hide();
    $(".logout").show();
    $(".sname").html(`${sname}(${scode})`);
}
```

### 정답

```js
const scode = sessionStorage.getItem("scode");
const sname = sessionStorage.getItem("sname");

if (!scode) {
    $(".login").show();
    $(".logout").hide();
} else {
    $(".login").hide();
    $(".logout").show();
    $(".sname").html(`${sname}(${scode})`);
}
```

### 포인트

- 로그인 정보는 `sessionStorage`에 저장되어 있다.
- 로그인하지 않았으면 로그인 메뉴만 보인다.
- 로그인했으면 사용자 이름과 로그아웃 메뉴가 보인다.

---

## 14. 게시글 목록 AJAX

### 문제

```js
function getList() {
    $.ajax({
        type: "____",
        url: "/board/____",
        data: { page, size, word },
        success: function (data) {
            const temp = Handlebars.____($("#temp").html());
            $("#tbl").html(temp(data.____));

            const last = Math.ceil(data.____ / size);
            $("#page_info").html(`${page}/${last}`);
        }
    });
}
```

### 정답

```js
function getList() {
    $.ajax({
        type: "get",
        url: "/board/list.json",
        data: { page, size, word },
        success: function (data) {
            const temp = Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data.list));

            const last = Math.ceil(data.count / size);
            $("#page_info").html(`${page}/${last}`);
        }
    });
}
```

### 포인트

- 목록 데이터는 `/board/list.json`에서 가져온다.
- `data.list`는 게시글 배열이다.
- `data.count`는 전체 게시글 수다.
- `Handlebars.compile()`은 템플릿을 HTML로 바꿔준다.

---

## 15. 글쓰기 버튼 로그인 검사

### 문제

```js
$(".btn-insert").on("click", function () {
    if (____) {
        location.href = "/board/insert";
    } else {
        sessionStorage.setItem("target", "/board/insert");
        location.href = "/users/____";
    }
});
```

### 정답

```js
$(".btn-insert").on("click", function () {
    if (scode) {
        location.href = "/board/insert";
    } else {
        sessionStorage.setItem("target", "/board/insert");
        location.href = "/users/login";
    }
});
```

### 포인트

- `scode`가 있으면 로그인 상태다.
- 로그인하지 않았으면 로그인 페이지로 보낸다.
- `target`은 로그인 후 다시 돌아갈 주소다.

---

## 16. req.body, req.params, req.query 구분

### 정리

| 종류 | 사용 예 | 코드 |
|---|---|---|
| body | POST로 보낸 form/AJAX 데이터 | `req.body.title` |
| params | URL 경로에 들어간 값 | `req.params.id` |
| query | URL 뒤의 `?page=1` 값 | `req.query.page` |

### 문제

```js
// /board/view/3
const id = req.____.id;

// /board/list.json?page=2&size=5
const page = req.____.page;

// AJAX data: { title, content }
const title = req.____.title;
```

### 정답

```js
// /board/view/3
const id = req.params.id;

// /board/list.json?page=2&size=5
const page = req.query.page;

// AJAX data: { title, content }
const title = req.body.title;
```

---

## 17. res.render, res.send, res.sendStatus 구분

### 정리

| 메서드 | 목적 |
|---|---|
| `res.render()` | EJS 화면 출력 |
| `res.send()` | 데이터 응답 |
| `res.sendStatus()` | 상태 코드만 응답 |

### 문제

```js
// 화면 출력
res.____('index', { pageName: 'board/list.ejs' });

// JSON 데이터 출력
res.____({ list, count });

// 성공 상태만 출력
res.____(200);
```

### 정답

```js
// 화면 출력
res.render('index', { pageName: 'board/list.ejs' });

// JSON 데이터 출력
res.send({ list, count });

// 성공 상태만 출력
res.sendStatus(200);
```

---

## 18. SQL 바인딩 변수

### 문제

```js
let sql = "delete from posts where id = ____";
await con.execute(sql, { ____ }, { autoCommit: true });
```

### 정답

```js
let sql = "delete from posts where id = :id";
await con.execute(sql, { id }, { autoCommit: true });
```

### 포인트

- Oracle 바인딩 변수는 `:id`처럼 쓴다.
- JavaScript 객체 `{ id }`가 실제 값을 전달한다.

---

## 19. 자주 나오는 빈칸 묶음

아래 단어들은 반드시 구분해서 외운다.

```txt
express.Router()
require()
module.exports
router.get()
router.post()
req.body
req.params
req.query
res.render()
res.send()
res.sendStatus()
getConnection()
con.execute()
con.close()
oracledb.OUT_FORMAT_OBJECT
autoCommit: true
sessionStorage.getItem()
preventDefault()
$.ajax()
Handlebars.compile()
location.href
```

---

## 20. 실전 복원 문제 1

### 문제

게시글 등록 라우터를 완성하시오.

```js
router.____('/insert', async function (req, res) {
    const title = req.____.title;
    const content = req.body.____;
    const writer = req.body.____;

    let con;
    try {
        con = await ____();
        let sql = "insert into posts(id,title, content, writer,reg_date) ";
        sql += "values(post_id.nextval, :title, :content, :writer,sysdate)";
        await con.____(sql, { title, content, writer }, { ____: true });
        res.____(200);
    } catch (err) {
        res.sendStatus(500);
    } finally {
        if (con) await con.____();
    }
});
```

### 정답

```js
router.post('/insert', async function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;

    let con;
    try {
        con = await getConnection();
        let sql = "insert into posts(id,title, content, writer,reg_date) ";
        sql += "values(post_id.nextval, :title, :content, :writer,sysdate)";
        await con.execute(sql, { title, content, writer }, { autoCommit: true });
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

---

## 21. 실전 복원 문제 2

### 문제

글쓰기 화면의 submit 이벤트를 완성하시오.

```js
$(frm).on("submit", function (e) {
    e.____();
    const title = $(frm.title).____();
    const content = $(frm.content).____();

    $.ajax({
        type: "____",
        url: "/board/____",
        data: { title, content, writer: ____ },
        success: function () {
            location.href = "/____";
        }
    });
});
```

### 정답

```js
$(frm).on("submit", function (e) {
    e.preventDefault();
    const title = $(frm.title).val();
    const content = $(frm.content).val();

    $.ajax({
        type: "post",
        url: "/board/insert",
        data: { title, content, writer: scode },
        success: function () {
            location.href = "/board";
        }
    });
});
```

---

## 22. 실전 복원 문제 3

### 문제

게시글 상세 조회 라우터를 완성하시오.

```js
router.get('/view/:id', async function (req, res) {
    const id = req.____.id;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, {
            outFormat: oracledb.____
        });
        let post = result.____[0];

        res.____('index', {
            title: '게시글 정보',
            pageName: 'board/read.ejs',
            post
        });
    } catch (err) {
        res.sendStatus(500);
    } finally {
        if (con) await con.____();
    }
});
```

### 정답

```js
router.get('/view/:id', async function (req, res) {
    const id = req.params.id;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });
        let post = result.rows[0];

        res.render('index', {
            title: '게시글 정보',
            pageName: 'board/read.ejs',
            post
        });
    } catch (err) {
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

---

## 23. 마지막 암기 체크

다음 질문에 답할 수 있으면 기본기는 충분하다.

1. 화면을 출력할 때 쓰는 응답 함수는?
2. JSON 데이터를 보낼 때 쓰는 응답 함수는?
3. POST body 값은 어디에서 꺼내는가?
4. `/view/:id`의 id는 어디에서 꺼내는가?
5. `/list.json?page=1`의 page는 어디에서 꺼내는가?
6. Oracle DB 연결 함수 이름은?
7. SQL 실행 함수 이름은?
8. INSERT 후 자동 저장 옵션은?
9. DB 연결을 닫는 함수는?
10. EJS input 값을 jQuery로 가져오는 함수는?

### 정답

```txt
1. res.render()
2. res.send()
3. req.body
4. req.params
5. req.query
6. getConnection()
7. con.execute()
8. autoCommit: true
9. con.close()
10. val()
```

---

## 24. 추천 공부 순서

1. `connect.js`를 외운다.
2. `app.js`에서 `/board` 라우터 연결을 확인한다.
3. `posts.js`의 등록, 목록, 상세, 삭제 순서로 빈칸을 푼다.
4. `insert.ejs`의 form submit AJAX를 외운다.
5. `list.ejs`의 목록 AJAX와 페이지 계산을 이해한다.
6. 마지막에는 코드를 보지 않고 요청 흐름을 말로 설명한다.

가장 중요한 한 문장:

```txt
화면은 res.render, 데이터는 res.send, 상태는 res.sendStatus,
POST 값은 req.body, URL 값은 req.params, 검색 조건은 req.query.
```
