const express = require('express');
// const app = express(); App.js를 통해서 오고 있으므로 app.get() 등을 쓸일이 없음

const router = express.Router();// App.js와 연결되기 위해 라우터 기능은 이용

// app.get('/', (req, res)=>{});
router.get('/', (req, res)=>{
    res.send("<h1>Hello, Express router - index - '/'</h1>");
});

router.get('/about', (req, res)=>{
    res.send("<h1>Hello, Express router - index - '/about'</h1>");
});

module.exports = router;