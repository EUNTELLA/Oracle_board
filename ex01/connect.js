const oracledb = require('oracledb');

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