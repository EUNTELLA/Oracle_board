var express = require('express');
var router = express.Router();
var { getConnection } = require('../connect');
var oracledb = require('oracledb');

/* 게시글 목록 */
router.get('/', function (req, res, next) {
    res.render('index', { title: '게시글', pageName: 'board/list.ejs' });
});

/* 게시글 등록 페이지 */
router.get('/insert', function (req, res) {
    res.render('index', { title: '글쓰기', pageName: 'board/insert.ejs' });
})

/* 게시글 등록 */
router.post('/insert', async function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;

    let con;
    try {
        con = await getConnection();
        let sql = "insert into posts(id,title, content, writer,reg_date) ";
        sql += "values(post_id.nextval, :title, :content, :writer,sysdate)";
        await con.execute(sql, { title, content, writer }, { autoCommit: true });
        res.sendStatus(200);
    } catch (err) {
        console.log('게시글 등록', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});

/* 게시글 상세 */
router.get('/view/:id', async function (req, res) {
    const id = req.params.id;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        let post = result.rows[0];

        res.render('index', { title: '게시글 정보', pageName: 'board/read.ejs', post });
    } catch (err) {
        console.log('게시글 상세', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});

/* 게시글 데이터 */
//board/list.json?page=1&size=5
router.get('/list.json', async function (req, res) {
    let page = Number(req.query.page) || 1;
    let size = Number(req.query.size) || 5;
    let word = req.query.word || "";
    let offset_rows = (page - 1) * size;

    let con;
    let list;
    let count;
    try {
        con = await getConnection();
        let sql = "select * from view_posts ";
        sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%' `;
        sql += "order by id desc ";
        sql += `offset ${offset_rows} rows fetch next ${size} rows only`;

        let result = await con.execute(sql, {}, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        list = result.rows;

        sql = "select count(*) from view_posts ";
        sql += `where title like '%${word}%' or content like '%${word}%' or sname like '%${word}%'`;

        result = await con.execute(sql);
        count = result.rows[0][0];
        res.send({ list, count });
    } catch (err) {
        console.log('게시글 데이터', err.message);
    } finally {
        if (con) await con.close();
    }
});

/* 게시글 수정 */
router.post('/update/:id', async function (req, res) {
    const id = req.params.id;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        let post = result.rows[0];
        res.render('index', { title: '게시글 수정', pageName: 'board/update.ejs', post });
    } catch (err) {
        console.log('게시글 수정', err.message);
    } finally {
        if (con) await con.close();
    }
});

//게시글 삭제
router.post('/delete', async function (req, res) {
    const id = req.body.id;
    let con;
    try {
        con = await getConnection();
        let sql = "delete from posts where id = :id";
        await con.execute(sql, { id }, { autoCommit: true });
        res.sendStatus(200);
    } catch (err) {
        console.log('게시글 삭제', err.message);
        res.sendStatus(500);
    } finally {
        if (con) await con.close();
    }
});

/* 게시글 수정 페이지 */
router.get('/update/:id', async function (req, res) {
    const id = req.params.id;
    let con;
    try {
        con = await getConnection();
        let sql = "select * from view_posts where id = :id";
        let result = await con.execute(sql, { id }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
        let post = result.rows[0];

        res.render('index', { title: '게시글 수정', pageName: 'board/update.ejs', post });
    } catch (err) {
        console.log('글 수정 페이지', err.message);
        res.sendStatus(500);
    }
    finally {
        if (con) await con.close();
    }
});
module.exports = router;
