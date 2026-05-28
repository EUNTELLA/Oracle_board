# 게시판 SQL 정리

Oracle 12c 이상 기준이다. `posts.id`는 `IDENTITY`로 자동 증가시키므로 별도 시퀀스를 만들지 않는다.

## 학생 비밀번호 컬럼

```sql
ALTER TABLE students ADD pass VARCHAR2(200);

UPDATE students
SET pass = '1234';

COMMIT;
```

이미 `pass` 컬럼이 있으면 `ALTER TABLE`은 실행하지 않고 `UPDATE`만 실행한다.

## posts 테이블 생성

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

## 주의

`id`는 자동 증가하므로 아래 방식은 사용하지 않는다.

```sql
CREATE SEQUENCE post_id START WITH 1 INCREMENT BY 1;

INSERT INTO posts(id, writer, title, content)
VALUES(post_id.nextval, '92414029', '제목', '내용');
```
