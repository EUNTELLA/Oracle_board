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

DB 등록은 바인드 변수로 처리한다.

```javascript
let sql = 'insert into students(scode, sname, dept, birthday, year, advisor) ';
sql += `values(:scode, :sname, :dept, to_date(:birthday,'YYYY-MM-DD'), :year, :pcode)`;

await con.execute(sql, { scode, sname, dept, birthday, year, pcode }, {
    autoCommit: true
});
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

