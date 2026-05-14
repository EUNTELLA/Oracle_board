# Oracle View

## View를 사용하는 이유

학생 목록에서 학생 정보와 교수 이름을 함께 보여주려면 `students`와 `professors`를 조인해야 한다.

매번 긴 조인 SQL을 쓰는 대신 View를 만들면 코드에서 간단히 조회할 수 있다.

```javascript
const sql = "select * from view_students";
```

## view_students 생성

```sql
CREATE OR REPLACE VIEW view_students AS
SELECT
    s.*,
    p.pname,
    TO_CHAR(s.birthday, 'YYYY-MM-DD') AS fdate
FROM students s, professors p
WHERE p.pcode(+) = s.advisor;
```

조회:

```sql
SELECT * FROM view_students;
```

`p.pcode(+)`는 Oracle의 외부 조인 문법이다. 담당 교수가 없는 학생도 조회할 수 있다.

## 확인 SQL

현재 계정 확인:

```sql
SELECT USER FROM dual;
```

테이블 확인:

```sql
SELECT table_name FROM user_tables;
```

뷰 확인:

```sql
SELECT view_name FROM user_views;
```

