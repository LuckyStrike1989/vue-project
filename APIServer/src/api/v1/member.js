const express = require('express');
const router = express.Router();
const getDBConnection = require('../../db/mariadb/connection');
const mybatisMapper = require('mybatis-mapper');

mybatisMapper.createMapper(['./src/db/mappers/mariadb/lunchmenu/member-sql.xml']);

// SQL 언어 형식과 들여쓰기를 설정
const format = {language: 'mariadb', indent: '  '};

// mybatisMapper namespace
const namespace = 'apiserver.db.mappers.mariadb.lunchmenu.member';

// 사용자 ID로 검색하여 사용자를 인증하고 리턴합니다.
router.post('/login', async function(req, res, next) {
    console.log(`REST API Post Method - Member Login.`);

    const result = {
        result: 'success',
        code: 200,
        message: '',
        data: {}
    };

    if( req.body.id == undefined || req.body.id == "" ) {
        result.result = "fail";
        result.code = 400;
        result.message = "id가 없습니다.";
        res.status(result.code).json(result);
        return;
    } else if( req.body.password == undefined || req.body.password == "" ) {
        result.result = "fail";
        result.code = 400;
        result.message = "password가 없습니다."
        res.status(result.code).json(result);
        return;
    }

    const params = {
        id : req.body.id
        , password : req.body.password
    }

    //const query = "SELECT * FROM tb_member WHERE mbr_id = ? AND mbr_pw = ?";
    const query = mybatisMapper.getStatement(namespace, 'selectMember', params, format);

    let conn;

    conn = await getDBConnection();
    //data = await conn.query(query, [req.body.id, req.body.password]);
    data = await conn.query(query);

    try {
        conn = await getDBConnection();
        //data = await conn.query(query, [req.body.id, req.body.password]);
        data = await conn.query(query);

        if( data.length == 0 ) {
            result.result = "fail";
            result.code = 401;
            result.message = "사용자가 없습니다.";
        } else {
            if (data[0].mbr_pw != params.password) {
                result.result = "fail";
                result.code = 401;
                result.message = "비밀번호가 동일하지 않습니다.";
            } else {
                result.message = "사용자가 인증되었습니다.";
            }
        }
    } catch (error) {
        result.result = "fail";
        result.code = 500;
        if (error.code == "ER_NO_SUCH_TABLE") {
            result.message = "테이블이 없습니다.";
        } else {
            result.message = "서버 오류가 발생하였습니다.";
        }
    } finally {
        if (conn) {
            conn.release();
        }
    }

    res.status(result.code).json(result);
});

module.exports = router;