const express = require('express');
const router = express.Router();
const getDBConnection = require('../APIServer/src/db/mariadb/connection')

const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Request의 내용(body)을 JSON 데이터로 변화해서 사용할 수 설정
app.use(express.json());
// express.urlencoded() 메서드를 이용하여 URL를 인코딩 할 수 있게 설정
app.use(express.urlencoded({extended:false}));
// 모든 리소스에 접근 허용 - CORS(Cross-origin resource sharing, 교차 출처 리소스 공유) 문제 해결
// GET, POST, PUT, DELETE 메서드 사용 허용
// content-type 요청 허용
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'content-type');
	next();
});

// 점심 메뉴 연결
app.use('/api/v1/lunchmenus', require('./src/api/v1/lunchmenu'));

app.listen(port, () => {
    console.log(`APIServer started on port ${port}`);
});