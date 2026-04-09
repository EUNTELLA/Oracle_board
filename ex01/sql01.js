//교수목록
const { getConnection } = require('./connect');

async function execute() {
    let con;
    try {
        con = await getConnection();
        const sql = 'select * from professors';
        const result = await con.execute(sql);
        console.log(result.rows);
    } catch (err) {
        console.log('오류', err);
    } finally {
        if (con) await con.close();

    }
}
execute();