# CRUD 라우트 흐름

## 목록 조회

목록 페이지는 화면을 렌더링하고, 실제 데이터는 JSON API에서 가져온다.

```text
GET /haksa/stu
  -> students.ejs 렌더링
  -> Ajax로 /haksa/stu/list.json 요청
  -> DB 조회 결과를 테이블로 출력
```

## 등록

등록 페이지 이동:

```text
GET /haksa/stu/insert
```

등록 처리:

```text
POST /haksa/stu/insert
```

입력값은 `req.body`에서 받는다.

```javascript
const scode = req.body.scode;
const sname = req.body.sname;
const dept = req.body.dept;
const birthday = req.body.birthday;
const year = req.body.year;
const pcode = req.body.pcode;
```

### `req.body`가 필요한 이유

`app.js`에서 `express.urlencoded({ extended: false })`가 설정되어 있어야 HTML form 데이터가 `req.body`에 들어온다. 이것을 빼먹으면 `undefined`가 된다.

### 왜 async/await를 쓰나?

DB 연결과 SQL 실행은 외부 I/O 작업이다. `await`를 쓰면 서버가 결과가 준비될 때까지 기다렸다가 다음 코드를 실행한다.

```javascript
router.post('/stu/insert', async function (req, res) {
    let con;
    try {
        con = await getConnection();
        const result = await con.execute(sql, bindData, { autoCommit: true });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
    } finally {
        if (con) await con.close();
    }
});
```

`await` 없이 `con.execute()`를 바로 쓰면 SQL 실행 결과를 받기 전에 다음 코드가 실행되어 응답이 잘못될 수 있다.

DB 등록은 바인드 변수로 처리한다.

```javascript
let sql = 'insert into students(scode, sname, dept, birthday, year, advisor) ';
sql += `values(:scode, :sname, :dept, to_date(:birthday,'YYYY-MM-DD'), :year, :pcode)`;

await con.execute(sql, { scode, sname, dept, birthday, year, pcode }, {
    autoCommit: true
});
```

### 교수 등록 코드 주의점

`haksa.js`의 교수 등록 코드에는 문자열을 직접 이어붙여 SQL을 만드는 부분이 있다. 시험에서는 안전한 바인드 변수를 쓰는 방식이 정답이다.

```javascript
const sql = 'insert into professors(pcode, pname, dept, hiredate, title, salary) ';
sql += `values(:pcode, :pname, :dept, TO_DATE(:hiredate,'YYYY-MM-DD'), :title, :salary)`;
```

## 삭제

삭제 버튼에서 학생번호를 `data-scode`에 담는다.

```html
<button class="delete" data-scode="{{SCODE}}">삭제</button>
```

클릭하면 Ajax로 삭제 요청을 보낸다.

```javascript
const scode = $(this).data("scode");

$.ajax({
    type: "post",
    url: "/haksa/stu/delete",
    data: { scode: scode }
});
```

서버에서는 바인드 변수로 삭제한다.

```javascript
const sql = 'delete from students where scode = :scode';
await con.execute(sql, { scode: scode }, { autoCommit: true });
```

