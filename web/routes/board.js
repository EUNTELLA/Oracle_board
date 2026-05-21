var express = require('express');
var router = express.Router();
const { getConnection } = require('../connect');
const oracle = require('oracledb');

/* 게시글 목록 */
router.get('/', function (req, res, next) {
    res.render('index', { title: '게시글', pageName: 'board/list.ejs' });
});

/* 게시글 목록 데이터 */
router.get('/list.json', async function (req, res) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const offset_rows = (page - 1) * size;
    const max_rows = offset_rows + size;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from (";
        sql += "select rownum row_no, p.* from (select * from view_posts order by id desc) p ";
        sql += "where rownum <= :max_rows";
        sql += ") where row_no > :offset_rows";
        let result = await con.execute(sql, { max_rows, offset_rows }, { outFormat: oracle.OUT_FORMAT_OBJECT });
        const list = result.rows;
        sql = "select count(*) from view_posts";
        result = await con.execute(sql);
        const total = result.rows[0][0];
        res.send({ list, total });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});

module.exports = router;
