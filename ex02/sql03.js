//학생목록 출력
const { getConnection } = require('./connect');
const readline = require('readline-sync');

async function execute() {
    let con;
    try {
        con = await getConnection();
        const scode = readline.question('학생번호>');
        const sname = readline.question('학생이름>');
        const dept = '건축';
        const sql = 'insert into students(scode,sname,dept) values(:scode,:sname,:dept)';
        await con.execute(sql, { scode, sname, dept }, { autoCommit: true });
        console.log('학생 등록 성공');

    } catch (err) {
        //console.error( err.message);
        switch (err.errorNum) {
            case 1:
                console.log('이미 존재하는 학번입니다.');
                break;
            default:
                console.log('에러:', err.errorNum);
        }
    } finally {
        if (con) await con.close();
    }
}
execute();
