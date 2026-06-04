# 게시판 SQL 정리

Oracle 12c 이상 기준이다. `posts.id`는 `IDENTITY`로 자동 증가시키므로 별도 시퀀스를 만들지 않는다.

## 현재 상태에서 먼저 확인

이미 게시판 실습을 한 번 진행했다면 테이블과 컬럼이 이미 있을 수 있다.

```sql
SELECT *
FROM posts;

SELECT *
FROM view_posts;
```

둘 다 조회되면 `students.pass`, `posts`, `view_posts` 준비가 끝난 상태다. 이 경우 `ALTER TABLE students ADD pass ...`와 `CREATE TABLE posts ...`는 다시 실행하지 않는다.

이미 있는 객체를 다시 만들면 아래 오류가 나는 것이 정상이다.

```text
ORA-01430: 추가하려는 열이 이미 테이블에 존재합니다
ORA-00955: 기존의 객체가 이름을 사용하고 있습니다
```

## 학생 비밀번호 컬럼

```sql
ALTER TABLE students ADD pass VARCHAR2(200);

UPDATE students
SET pass = '1234';

COMMIT;
```

이미 `pass` 컬럼이 있으면 `ALTER TABLE`은 실행하지 않고 `UPDATE`만 실행한다.

## posts 테이블 생성

이미 `posts` 테이블이 있으면 이 부분은 실행하지 않는다.

```sql
CREATE TABLE posts (
    id       NUMBER GENERATED ALWAYS AS IDENTITY,
    writer   CHAR(8),
    reg_date DATE DEFAULT SYSDATE,
    title    VARCHAR2(300) NOT NULL,
    content  VARCHAR2(2000) NOT NULL,
    CONSTRAINT pk_posts_id PRIMARY KEY (id),
    CONSTRAINT fk_posts_writer FOREIGN KEY(writer) REFERENCES students(scode)
);
```

`writer`는 `students.scode`와 같아야 뷰에서 학생 이름(`sname`)을 함께 조회할 수 있다.

## 샘플 데이터

```sql
INSERT INTO posts(writer, title, content)
VALUES('92414029', '대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.', '내용없음');

INSERT INTO posts(writer, title, content)
VALUES('92414029', '국가원로자문회의의 의장은 직전대통령이 된다.', '내용없음');

INSERT INTO posts(writer, title, content)
VALUES('92414033', '직전대통령이 없을 때에는 대통령이 지명한다.', '내용없음');

INSERT INTO posts(writer, title, content)
VALUES('92414029', '모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다.', '내용없음');

INSERT INTO posts(writer, title, content)
VALUES('92414033', '대통령의 임기는 5년으로 하며, 중임할 수 없다.', '내용없음');

COMMIT;
```

데이터를 더 늘리고 싶으면 기존 게시글을 복사한다.

```sql
INSERT INTO posts(writer, title, content)
SELECT writer, title, content
FROM posts;

COMMIT;
```

## vposts 뷰 생성

검색과 목록 조회의 기본 뷰다.

```sql
CREATE OR REPLACE VIEW vposts AS
SELECT
    posts.*,
    students.sname,
    TO_CHAR(posts.reg_date, 'YYYY-MM-DD HH24:MI:SS') fmt_date
FROM posts, students
WHERE posts.writer = students.scode;
```

## view_posts 뷰 생성

최근 글 순서로 행번호(`rn`)를 붙인 뷰다.

```sql
CREATE OR REPLACE VIEW view_posts AS
SELECT ROWNUM rn, p.*
FROM (
    SELECT *
    FROM vposts
    ORDER BY id DESC
) p;
```

## 확인

```sql
SELECT *
FROM posts;

SELECT *
FROM view_posts
WHERE rn BETWEEN 1 AND 10;
```

## Node 게시글 목록 조회 코드

`web/routes/posts.js`의 `/board/list.json`에서 `view_posts`를 조회한다.

시험 방식처럼 문자열을 `sql += ...`로 붙여 쓸 때는 각 SQL 조각 끝에 공백을 넣어야 한다.

```javascript
let page = Number(req.query.page) || 1;
let size = Number(req.query.size) || 5;
let word = req.query.word || "";
let offset_rows = (page - 1) * size;

let sql = "select * from view_posts ";
sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%' `;
sql += "order by id desc ";
sql += `offset ${offset_rows} rows fetch next ${size} rows only`;

let result = await con.execute(sql, {}, { outFormat: oracledb.OUT_FORMAT_OBJECT });
list = result.rows;

sql = "select count(*) from view_posts ";
sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%'`;

result = await con.execute(sql);
count = result.rows[0][0];
```

주의할 점:

- `"select * from view_posts "`처럼 마지막에 공백이 있어야 한다.
- `where ... ` 뒤에도 공백이 있어야 `order by`와 붙지 않는다.
- `"order by id desc "` 뒤에도 공백이 있어야 `offset`과 붙지 않는다.
- `${offset_rows}`, `${size}`를 값으로 넣는 줄은 백틱을 사용한다.

공백이 없으면 실제 SQL이 아래처럼 붙어서 `ORA-00933`이 발생한다.

```sql
select * from view_postswhere title like '%%' order by id descoffset 0 rows fetch next 5 rows only
```

## 화면 흐름

```text
GET /board
-> board/list.ejs 출력
-> AJAX로 /board/list.json?page=1&size=5 요청
-> posts.js에서 view_posts 조회
-> { list, count } JSON 반환
-> list.ejs에서 Handlebars로 테이블 출력
```

## 주의

`id`는 자동 증가하므로 아래 방식은 사용하지 않는다.

```sql
CREATE SEQUENCE post_id START WITH 1 INCREMENT BY 1;

INSERT INTO posts(id, writer, title, content)
VALUES(post_id.nextval, '92414029', '제목', '내용');
```
