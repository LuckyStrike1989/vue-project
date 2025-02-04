const express = require('express');
const router = express.Router();
const getDBConnection = require('../../db/mariadb/connection')

// 전체 점심 메뉴 리스트를 리턴합니다.
router.get('/', async function(req, res, next) {
    console.log("REST API Get Method - Read All Lunch Menu.");

    const result = {
        result: 'success',
        code: 200,
        message: '',
        data: []
    }

    const query = "SELECT * FROM tb_lunch_menu ORDER BY REG_DTM DESC";

    let conn;

    try {
        conn = await getDBConnection();
        data = await conn.query(query, []);
        if( data.length == 0 ) {
            result.message = "데이터가 없습니다.";
        } else {
            result.message = "데이터가 조회되었습니다.";
            result.data = data;
        }
    } catch(error) {
        result.result = "fail";
        result.code = 500;
        if( error.code == "ER_NO_SUCH_TABLE" ) {
            result.message = "테이블이 없습니다.";
        } else {
            result.message = "서버 오류가 발생하였습니다.";
        }
        console.log(error);
    } finally {
        if(conn) {
            conn.release();
        }
    }

    res.status(result.code).json(result);
});

// 점심 메뉴 번호로 검색하여 점심 메뉴를 리턴합니다.
router.get('/:no', async function(req, res, next) {
    console.log(`REST API Get Method - Read Lunch Menu ${req.params.no}`);

    const result = {
        result: 'success',
        code: 200,
        message: '',
        data: {}
    };

    const query = "SELECT * FROM tb_lunch_menu WHERE seq = ?";
    let conn;
    try {
        conn = await getDBConnection();
        data = await conn.query(query, [req.params.no]);
        if( data.length == 0 ) {
            result.message = "데이터가 없습니다.";
        } else {
            result.message = "데이터가 조회되었습니다.";
            result.data = data[0];
        }
    } catch(error) {
        result.result = "fail";
        result.code = 500;
        if(error.code == "ER_NO_SUCH_TABLE") {
            result.message = "테이블이 없습니다.";
        } else {
            result.message = "서버 오류가 발생하였습니다.";
        }
        console.log(error);
    } finally {
        if(conn) {
            conn.release();
        }
    }

    res.status(result.code).json(result);
});

// 점심 메뉴를 등록합니다.
router.post('/', async function(req, res, next) {
	console.log("REST API Post Method - Create Lunch Menu.");

    const result = {
		result: 'success',
		code: 200,
		message: '',
		data: {}
	}

	if (req.body.menuName == undefined || req.body.menuName == "") {
		result.result = "fail";
		result.code = 400;
		result.message = "menuName이 없습니다."
		res.status(result.code).json(result);
		return;
	}

	const query = "INSERT INTO tb_lunch_menu (menu_name) VALUES(?)";

	let conn;
	try {
		conn = await getDBConnection();
		data = await conn.query(query, [req.body.menuName]);
		// OkPacket { affectedRows: 1, insertId: 4n, warningStatus: 0 }
		if (data.affectedRows == 1) {
			result.message = "데이터가 등록되었습니다.";
		} else {
			result.message = "데이터가 등록되지 않았습니다.";
		}
	} catch (error) {
        result.result = "fail";
		result.code = 500;
		if (error.code == "ER_NO_SUCH_TABLE") {
			result.message = "테이블이 없습니다.";
        } else {
			result.message = "서버 오류가 발생하였습니다.";
		}
        console.log(error);
    } finally {
		if (conn) {
			conn.release();
		}
	}

    res.status(result.code).json(result);
});

// 점심 메뉴를 수정합니다.
router.put('/:no', async function(req, res, next) {
	console.log(`REST API Put Method - Update Lunch Menu ${req.params.no}.`);

	const result = {
		result: 'success',
		code: 200,
		message: '',
		data: {}
	}

	if (req.body.menuName == undefined || req.body.menuName == "") {
		result.result = "fail";
		result.code = 400;
		result.message = "menuName이 없습니다."
		res.status(result.code).json(result);
		return;
	}

    const query = "UPDATE tb_lunch_menu SET menu_name = ? WHERE seq = ?";
    
	let conn;
	try {
		conn = await getDBConnection();
		data = await conn.query(query, [req.body.menuName, req.params.no]);
		// OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
		if (data.affectedRows == 1) {
			result.message = "데이터가 수정되었습니다.";
		} else {
			result.message = "데이터가 수정되지 않았습니다.";
		}
	} catch (error) {
		result.result = "fail";
		result.code = 500;
		if (error.code == "ER_NO_SUCH_TABLE") {
			result.message = "테이블이 없습니다.";
		} else {
			result.message = "서버 오류가 발생하였습니다.";
		}
		console.log(error);
	} finally {
		if (conn) {
			conn.release();
		}
	}

	res.status(result.code).json(result);
});

// 점심 메뉴를 삭제제합니다.
router.delete('/:no', async function(req, res, next) {
	console.log(`REST API Delete Method - Delete Lunch Menu ${req.params.no}.`);

	const result = {
		result: 'success',
		code: 200,
		message: '',
		data: {}
	}

	const query = "DELETE FROM tb_lunch_menu WHERE seq = ?";
    
	let conn;
	try {
		conn = await getDBConnection();
		data = await conn.query(query, [req.params.no]);
		// OkPacket { affectedRows: 1, insertId: 0n, warningStatus: 0 }
		if (data.affectedRows == 1) {
			result.message = "데이터가 삭제되었습니다.";
		} else {
			result.message = "데이터가 삭제되지 않았습니다.";
		}
	} catch (error) {
		result.result = "fail";
		result.code = 500;
		if (error.code == "ER_NO_SUCH_TABLE") {
			result.message = "테이블이 없습니다.";
		} else {
			result.message = "서버 오류가 발생하였습니다.";
		}
		console.log(error);
	} finally {
        if (conn) {
			conn.release();
		}
    }

    res.status(result.code).json(result);
});

module.exports = router;