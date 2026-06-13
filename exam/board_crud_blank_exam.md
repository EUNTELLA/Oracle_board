# 게시판 CRUD 빈칸 시험 대비 자료

## 1. 게시판 기능별 구성

| 기능 | 화면 파일 | 서버 라우트 | 처리 방식 |
|---|---|---|---|
| 목록 화면 | `views/board/list.ejs` | `GET /board` | 화면 렌더링 |
| 목록 데이터 | `list.ejs`의 `getList()` | `GET /board/list.json` | AJAX 비동기 |
| 글쓰기 화면 | `views/board/insert.ejs` | `GET /board/insert` | 화면 렌더링 |
| 글 등록 | `insert.ejs`의 `$.ajax()` | `POST /board/insert` | AJAX 비동기 |
| 상세 보기 | `views/board/read.ejs` | `GET /board/view/:id` | 화면 렌더링 |
| 삭제 | `read.ejs`의 `$.ajax()` | `POST /board/delete` | AJAX 비동기 |
| 수정 화면 | `views/board/update.ejs` | `GET /board/update/:id` | 화면 렌더링 |

## 2. 동기 처리와 비동기 처리

### 동기 처리

페이지가 직접 이동하거나 서버가 EJS 화면을 렌더링한다.

```javascript
router.get('/insert', function (req, res) {
    res.render('index', { title: '글쓰기', pageName: 'board/insert.ejs' });
});
```

```javascript
location.href = "/board/insert";
```

### 비동기 처리

페이지 전체를 새로고침하지 않고 `$.ajax()`로 서버에 요청한다.

```javascript
$.ajax({
    type: "get",
    url: "/board/list.json",
    data: { page, size, word },
    success: function (data) {
        $("#tbl").html(temp(data.list));
    }
});
```

## 3. 꼭 구분해야 하는 요청 데이터

| 구분 | 의미 | 예시 |
|---|---|---|
| `req.params` | 주소 경로에 포함된 값 | `/board/view/3` |
| `req.query` | 주소 뒤 query string 값 | `/board/list.json?page=1&size=5` |
| `req.body` | POST로 전송된 데이터 | `{ title, content }` |

```javascript
const id = req.params.id;
const page = req.query.page;
const title = req.body.title;
```

## 4. 시험에 자주 나오는 핵심 코드

| 코드 | 의미 |
|---|---|
| `res.render()` | EJS 화면을 렌더링 |
| `res.send()` | 데이터를 응답 |
| `res.sendStatus(200)` | 성공 상태 코드 응답 |
| `await getConnection()` | Oracle DB 연결 |
| `await con.execute()` | SQL 실행 |
| `autoCommit: true` | DB 변경 사항 즉시 반영 |
| `oracledb.OUT_FORMAT_OBJECT` | 결과를 객체 형태로 받음 |
| `e.preventDefault()` | form 기본 제출 막기 |

---

# 빈칸 문제

## 문제 1. 게시판 라우터 등록

```javascript
var express = require('express');
var router = express.____();
var { getConnection } = require('../connect');
var oracledb = require('oracledb');

module.exports = ____;
```

정답

1. `Router`
2. `router`

## 문제 2. app.js에서 게시판 라우터 연결

```javascript
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/haksa', require('./routes/haksa'));
app.use('/____', require('./routes/____'));
```

정답

1. `board`
2. `posts`

## 문제 3. 목록 화면 렌더링

```javascript
router.get('/', function (req, res, next) {
    res.____('index', {
        title: '게시판',
        pageName: 'board/____.ejs'
    });
});
```

정답

1. `render`
2. `list`

## 문제 4. 목록 데이터 AJAX 요청

```javascript
function getList() {
    $.ajax({
        type: "____",
        url: "/board/____.json",
        data: { page, size, word },
        success: function (data) {
            const temp = Handlebars.compile($("#temp").html());
            $("#tbl").html(temp(data.____));
        }
    });
}
```

정답

1. `get`
2. `list`
3. `list`

## 문제 5. 목록 데이터 서버 처리

```javascript
router.get('/list.json', async function (req, res) {
    let page = Number(req.____.page) || 1;
    let size = Number(req.query.size) || 5;
    let word = req.query.word || "";
    let offset_rows = (page - 1) * size;

    let con;
    try {
        con = await ____();

        let sql = "select * from view_posts ";
        sql += "order by id desc ";
        sql += `offset ${offset_rows} rows fetch next ${size} rows only`;

        let result = await con.____(sql, {}, {
            outFormat: oracledb.____
        });

        res.____({ list: result.rows });
    } finally {
        if (con) await con.____();
    }
});
```

정답

1. `query`
2. `getConnection`
3. `execute`
4. `OUT_FORMAT_OBJECT`
5. `send`
6. `close`

## 문제 6. 글쓰기 화면 이동

```javascript
router.get('/insert', function (req, res) {
    res.render('index', {
        title: '글쓰기',
        pageName: 'board/____.ejs'
    });
});
```

정답

1. `insert`

## 문제 7. 글 등록 form submit 막기

```javascript
$(frm).on("submit", function (e) {
    e.____();

    const title = $(frm.title).____();
    const content = $(frm.content).val();

    if (title == "" || content == "") {
        alert("제목과 내용을 입력하세요");
        frm.title.____();
    }
});
```

정답

1. `preventDefault`
2. `val`
3. `focus`

## 문제 8. 글 등록 AJAX

```javascript
$.ajax({
    type: "____",
    url: "/board/____",
    data: {
        title,
        content,
        writer: ____
    },
    success: function () {
        location.href = "/____";
    }
});
```

정답

1. `post`
2. `insert`
3. `scode`
4. `board`

## 문제 9. 글 등록 서버 처리

```javascript
router.post('/insert', async function (req, res) {
    const title = req.____.title;
    const content = req.body.content;
    const writer = req.body.writer;

    let con;
    try {
        con = await getConnection();

        let sql = "insert into posts(id, title, content, writer, reg_date) ";
        sql += "values(post_id.nextval, :title, :content, :writer, sysdate)";

        await con.execute(sql, { title, content, writer }, {
            ____: true
        });

        res.____(200);
    } catch (err) {
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
```

정답

1. `body`
2. `autoCommit`
3. `sendStatus`

## 문제 10. 상세 보기 주소 값 받기

```javascript
router.get('/view/:id', async function (req, res) {
    const id = req.____.id;

    let con;
    try {
        con = await getConnection();

        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { ____ }, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        let post = result.rows[____];

        res.render('index', {
            title: '게시글 정보',
            pageName: 'board/____.ejs',
            post
        });
    } finally {
        if (con) await con.close();
    }
});
```

정답

1. `params`
2. `id`
3. `0`
4. `read`

## 문제 11. EJS로 상세 내용 출력

```ejs
<div class="card-header py-3">
    <%=post.____%>
</div>
<div class="card-body">
    <p style="white-space: pre-wrap;">
        <%=post.____%>
    </p>
</div>
<div class="card-footer py-3">
    Posted on <span>
        <%=post.____%>
    </span>
    by <span class="writer">
        <%=post.____%>
    </span>
</div>
```

정답

1. `TITLE`
2. `CONTENT`
3. `FMT_DATE`
4. `SNAME`

## 문제 12. 작성자만 수정/삭제 버튼 보이기

```javascript
const writer = $(".writer").html();
const id = "<%=post.ID%>";

if (writer == ____) {
    $(".btn-modify").____();
} else {
    $(".btn-modify").____();
}
```

정답

1. `sname`
2. `show`
3. `hide`

## 문제 13. 삭제 AJAX

```javascript
$(".btn-delete").on("click", function () {
    if (confirm(`${id}번 게시글을 삭제하시겠습니까?`)) {
        $.ajax({
            type: "____",
            url: "/board/____",
            data: { ____ },
            success: function () {
                location.href = "/board";
            }
        });
    }
});
```

정답

1. `post`
2. `delete`
3. `id`

## 문제 14. 삭제 서버 처리

```javascript
router.post('/delete', async function (req, res) {
    const id = req.____.id;

    let con;
    try {
        con = await getConnection();

        let sql = "delete from posts where id = :id";
        await con.____(sql, { id }, {
            autoCommit: true
        });

        res.sendStatus(____);
    } catch (err) {
        res.sendStatus(____);
    } finally {
        if (con) await con.close();
    }
});
```

정답

1. `body`
2. `execute`
3. `200`
4. `500`

## 문제 15. 수정 화면 렌더링

```javascript
router.get('/update/:id', async function (req, res) {
    const id = req.params.id;

    let con;
    try {
        con = await getConnection();

        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        });

        let post = result.rows[0];

        res.____('index', {
            title: '게시글 수정',
            pageName: 'board/____.ejs',
            post
        });
    } finally {
        if (con) await con.close();
    }
});
```

정답

1. `render`
2. `update`

## 문제 16. 수정 화면에 기존 값 출력

```ejs
<form name="frm">
    <input value="<%=post.____%>" name="title" class="form-control mb-3">
    <textarea name="content" class="form-control mb-3" rows="15"><%=post.____%></textarea>
</form>
```

정답

1. `TITLE`
2. `CONTENT`

## 문제 17. DB 연결 함수

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

## 문제 18. try-catch-finally 구조

```javascript
let con;
try {
    con = await getConnection();
    await con.execute(sql, data, { autoCommit: true });
    res.sendStatus(200);
} catch (err) {
    console.log(err.message);
    res.sendStatus(500);
} finally {
    if (con) await con.____();
}
```

정답

1. `close`

---

# 최종 암기 포인트

1. 화면을 보여줄 때는 `res.render()`를 사용한다.
2. JSON 데이터를 보낼 때는 `res.send()`를 사용한다.
3. 성공/실패 상태만 보낼 때는 `res.sendStatus(200)`, `res.sendStatus(500)`을 사용한다.
4. 목록 데이터, 등록, 삭제는 AJAX 비동기 처리이다.
5. 상세 보기와 수정 화면은 EJS 렌더링 방식이다.
6. `GET` 요청의 query string은 `req.query`로 받는다.
7. 주소에 포함된 `:id` 값은 `req.params.id`로 받는다.
8. `POST`로 보낸 데이터는 `req.body`로 받는다.
9. DB 연결은 `await getConnection()`으로 한다.
10. SQL 실행은 `await con.execute()`로 한다.
11. insert, update, delete에는 `autoCommit: true`가 필요하다.
12. DB 연결은 `finally`에서 `con.close()`로 닫는다.
