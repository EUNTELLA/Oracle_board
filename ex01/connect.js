const oracledb = require('oracledb');

try {
    oracledb.initOracleClient(); // 환경변수 PATH에 Oracle 클라이언트가 등록되어 있지 않다면 { libDir: 'C:\\oracle\\instantclient_19_21' } 와 같이 경로를 명시해야 합니다.
} catch (err) {
    console.error('Oracle Client 초기화 실패:', err);
}

async function getConnection() {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'user105',
            password: 'pass',
            connectString: 'localhost/xe'
        });
        console.log('oracle DB 연결 성공')
        return connection;
    } catch (err) {
        console.error('oracle DB 연결 실패:', err);
    }
}
module.exports = { getConnection };