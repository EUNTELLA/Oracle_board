# EJS 레이아웃

## EJS 렌더링

EJS는 서버에서 HTML을 만들어 브라우저에 보내는 템플릿 엔진이다.

```javascript
res.render('index', {
    title: '학생관리',
    pageName: 'haksa/students.ejs'
});
```

`index.ejs`에서는 공통 레이아웃을 만들고, `pageName`으로 실제 페이지를 포함한다.

```ejs
<%- include("menubar") %>
<%- include(pageName) %>
<%- include("bottom") %>
```

## View 파일은 직접 접속하지 않는다

브라우저에서 EJS 파일 경로로 직접 접속하면 안 된다.

잘못된 예:

```html
<a href="/web/views/home.ejs">HOME</a>
```

올바른 예:

```html
<a href="/">HOME</a>
```

`views` 폴더의 파일은 URL로 직접 여는 파일이 아니라, Express 라우터에서 `res.render()`로 렌더링하는 파일이다.

### pageName의 역할

`index.ejs`는 공통 레이아웃이고, 실제 내용은 `pageName`으로 전달된다. 이 구조를 시험에 물어볼 수 있다.

서버:

```javascript
res.render('index', { title: '학생관리', pageName: 'haksa/students.ejs' });
```

레이아웃:

```ejs
<%- include("menubar") %>
<%- include(pageName) %>
<%- include("bottom") %>
```

`pageName`에 들어가는 파일 이름이 정확해야 정상적으로 화면이 나온다.

## EJS 변수 출력

서버에서 넘긴 값은 EJS에서 `<%= %>`로 출력한다.

```javascript
res.render('index', {
    pageName: 'haksa/students_insert.ejs',
    code: newcode
});
```

```ejs
<input name="scode" value="<%= code %>">
```

서버에서 넘긴 이름과 EJS에서 쓰는 이름이 다르면 오류가 난다.

