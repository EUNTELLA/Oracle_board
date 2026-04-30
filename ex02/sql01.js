//학생목록 출력
const { getConnection } = require('./connect');

async function execute() {
    let con;
    try {
        con = await getConnection();
        const sql = 'SELECT * FROM students';
        const result = await con.execute(sql);
        console.log(result.rows);
    } catch (err) {
        console.error('에러:', err.message);
    } finally {
        if (con) await con.close();
    }
}
execute();
