//교수목록
const { getConnection } = require('./connect');
const readline = require('readline-sync');

async function execute() {
    let con;
    try {
        con = await getConnection();
        const pcode = '223'
        const pname = '강감찬'
        const sql = 'insert into professors (pcode,pname) values(:pcode,:pname)';
        await con.execute(sql, { pcode, pname }, { autoCommit: true });
        console.log('교수 추가 성공');
    } catch (err) {
        console.log('오류', err);
    } finally {
        if (con) await con.close();

    }
}
execute();