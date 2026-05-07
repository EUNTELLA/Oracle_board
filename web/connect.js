const oracledb = require('oracledb');
//1. Oracle버전 12미만인 경우 Thick 모드 활성화 (반드시 최상단에서 실행)
try {
    oracledb.initOracleClient({ libDir: 'C:\\oraclexe\\app\\oracle\\product\\11.2.0\\server\\bin' });
} catch (err) {
    console.log('오라클 클라이언트 초기화 실패', err);
    process.exit(1);
}
//2. 연결 함수 내보기기 (외부에서 사용 가능)
async function getConnection() {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'board',
            password: 'pass',
            connectionString: 'localhost:1521/xe'
        });
        console.log('Oracle DB 연결 성공!');
        return connection;
    } catch (err) {
        console.log('Connect 오류 발생:', err);
    }
}
module.exports = { getConnection };
