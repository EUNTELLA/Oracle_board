# 자주 발생한 오류

## 404 Not Found

라우터에 등록되지 않은 URL로 접속하면 발생한다.

예:

```text
/pro
```

올바른 경로:

```text
/haksa/pro
```

`app.js`에서 `/haksa`로 라우터가 연결되어 있기 때문이다.

```javascript
app.use('/haksa', require('./routes/haksa'));
```

## ORA-00942

테이블 또는 뷰가 없을 때 발생한다.

원인 예:

- `students`를 `studens`로 오타
- `view_students` 뷰를 만들지 않음
- 다른 DB 계정으로 접속함

확인:

```sql
SELECT USER FROM dual;
SELECT table_name FROM user_tables;
SELECT view_name FROM user_views;
```

## ORA-12899

컬럼 길이보다 긴 값이 들어갈 때 발생한다.

예:

```text
STUDENTS.ADVISOR maximum: 3
```

`advisor`에는 교수 이름이 아니라 교수코드가 들어가야 한다.

잘못된 값:

```text
이재광
```

올바른 값:

```text
228
```

## ORA-00911

SQL에 잘못된 문자가 있을 때 발생한다.

잘못된 예:

```javascript
const sql = 'delete from students where scode=${scode}';
```

작은따옴표라서 `${scode}`가 값으로 바뀌지 않는다.

올바른 예:

```javascript
const sql = 'delete from students where scode = :scode';
```

