var express = require('express');
var router = express.Router();
const { getConnection } = require('../connect');
const oracle = require('oracledb');

/* 게시글 목록 */
router.get('/', function (req, res, next) {
    res.render('index', { title: '게시글', pageName: 'board/list.ejs' });
});

/* 게시글 데이터 */
//board/list.json?page=1&size=5
router.get('/list.json', async function (req, res) {
    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 10;
    let offset_rows = (page - 1) * size;
    let word = req.query.word || "";
    let list;
    let count;
    let con;
    try {
        con = await getConnection();
        let sql = `
            select *
            from (
                select rownum rn, p.*
                from (
                    select *
                    from vposts
                    where title like :word or content like :word or sname like :word
                    order by id desc
                ) p
                where rownum <= :end_row
            )
            where rn > :offset_rows
        `;
        let result = await con.execute(sql, {
            word: `%${word}%`,
            end_row: offset_rows + size,
            offset_rows
        }, { outFormat: oracle.OUT_FORMAT_OBJECT });
        list = result.rows;
        sql = "select count(*) from vposts where title like :word or content like :word or sname like :word";
        result = await con.execute(sql, { word: `%${word}%` });
        count = result.rows[0][0];
        res.send({ list, count });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});
module.exports = router;
