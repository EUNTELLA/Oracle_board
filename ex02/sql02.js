//학생목록 출력
const { getConnection } = require('./connect');
const readline = require('readline-sync');

async function execute() {
    let con;
    try {
        con = await getConnection();
        let sname = readline.question('학생이름>');
        const sql = 'SELECT * FROM students where sname like :sname';
        sname = `%${sname}%`;
        const result = await con.execute(sql, { sname });
        console.log(result.rows);
    } catch (err) {
        console.error('에러:', err.message);
    } finally {
        if (con) await con.close();
    }
}
execute();
