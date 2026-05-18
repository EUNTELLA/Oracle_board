# Ajax와 Handlebars

## Ajax 비동기 요청

jQuery Ajax를 사용하면 페이지 전체를 새로고침하지 않고 서버에서 JSON 데이터를 받아올 수 있다.

```javascript
$.ajax({
    type: "get",
    url: "/haksa/stu/list.json",
    success: function (data) {
        console.log(data);
    }
});
```

서버에서는 JSON 데이터를 보낸다.

```javascript
router.get('/stu/list.json', async function (req, res) {
    const result = await con.execute(sql, {}, {
        outFormat: oracledb.OUT_FORMAT_OBJECT
    });
    res.send(result.rows);
});
```

## Handlebars 템플릿

Handlebars는 Ajax로 받은 JSON 배열을 HTML 테이블로 출력할 때 사용한다.

```html
<script id="temp_students" type="text/x-handlebars-template">
    <tbody>
        {{#each .}}
        <tr>
            <td>{{SCODE}}</td>
            <td>{{SNAME}}</td>
        </tr>
        {{/each}}
    </tbody>
</script>
```

```javascript
const temp = Handlebars.compile($("#temp_students").html());
$("#tbl_students").html(temp(data));
```

## 비동기 Ajax 흐름

Ajax 요청은 페이지 전체를 다시 로드하지 않고 데이터를 가져온다. `success` 콜백은 서버 응답을 받을 때 실행된다.

- 요청은 비동기이므로 `$.ajax()` 다음 줄이 즉시 실행된다.
- 서버에서 데이터를 받기 전에 `data`를 사용하면 값이 없을 수 있다.
- 따라서 템플릿 렌더링은 `success` 내부에서 해야 한다.

서버에서는 JSON 데이터를 `res.send(result.rows)`로 보낸다. 브라우저는 이를 받아서 Handlebars로 변환한다.

## data 속성

jQuery의 `.data()`로 값을 읽으려면 HTML 속성 이름을 `data-`로 시작해야 한다.

잘못된 예:

```html
<button scode="{{SCODE}}">삭제</button>
```

```javascript
$(this).data("scode");
```

올바른 예:

```html
<button data-scode="{{SCODE}}">삭제</button>
```

```javascript
const scode = $(this).data("scode");
```

## 서버 console과 브라우저 console

`haksa.js` 같은 서버 파일의 `console.log()`는 VS Code 터미널에 출력된다.

```javascript
console.log(result.rows);
```

`students.ejs` 같은 브라우저 script 안의 `console.log()`는 개발자도구 Console에 출력된다.

```javascript
console.log(data);
```

