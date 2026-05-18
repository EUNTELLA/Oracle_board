# Oracle DB 연결

## 연결 설정

Oracle DB 연결은 `web/connect.js`에서 처리한다.

이 프로젝트는 Oracle 11g 이하 버전을 사용할 경우 `thick mode`를 활성화하기 위해 `oracledb.initOracleClient()`를 먼저 호출한다.

```javascript
const oracledb = require('oracledb');
try {
    oracledb.initOracleClient({ libDir: 'C:\\oraclexe\\app\\oracle\\product\\11.2.0\\server\\bin' });
} catch (err) {
    console.log('오라클 클라이언트 초기화 실패', err);
    process.exit(1);
}
```

```javascript
async function getConnection() {
    const connection = await oracledb.getConnection({
        user: 'board',
        password: 'pass',
        connectionString: 'localhost:1521/xe'
    });
    return connection;
}
```

라우터에서는 DB 연결을 받아 SQL을 실행한다.

```javascript
con = await getConnection();
const result = await con.execute(sql);
```

사용 후에는 연결을 닫아야 한다.

```javascript
finally {
    if (con) await con.close();
}
```

## SQL 바인드 변수

사용자 입력값을 SQL에 직접 문자열로 붙이면 위험하다.

좋은 방식은 바인드 변수를 사용하는 것이다.

```javascript
const sql = 'delete from students where scode = :scode';
await con.execute(sql, { scode: scode }, { autoCommit: true });
```

장점:

- SQL Injection 방지
- 문자열 따옴표 문제 감소
- 숫자/문자 값 처리 안정성 증가

## autoCommit

INSERT, DELETE, UPDATE 같은 변경 SQL은 커밋이 필요하다.

Node.js에서는 다음처럼 `autoCommit: true`를 줄 수 있다.

```javascript
await con.execute(sql, bindData, { autoCommit: true });
```

Oracle SQL Developer에서는 직접 실행한 뒤 다음 명령을 해야 반영된다.

```sql
COMMIT;
```

