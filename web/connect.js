const oracledb = require('oracledb');

// 연결 함수 내보내기 (외부에서 사용 가능)
async function getConnection() {
    let connection;
    try {
        connection = await oracledb.getConnection({
            user: 'board',
            password: '1234',
            connectionString: 'localhost:1521/XEPDB1'
        });
        console.log('Oracle DB 연결 성공!');
        return connection;
    } catch (err) {
        console.log('Connect 오류 발생:', err);
        throw err;
    }
}
module.exports = { getConnection };
