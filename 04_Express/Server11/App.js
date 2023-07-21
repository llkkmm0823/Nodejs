const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');  // 템플릿엔진 사용을 위한  require

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});  // 넌적스 템플릿 엔진을 사용하기 위한 설정


app.get('/', (req, res)=>{
    //넌적스 템플릿 엔진에 의한 이동은 res.render를 사용
    res.render( 'index' , {title:'Express'} );
    // 넌적스를 이용해서 html 파일을 클라이언트에 보낼때  그 파일에 전달해줄 데이터를 
    // 위와 같이 객체형식으로 하나이상 같이 태워 보낼수가 있습니다.   
    //스프링에서의  request.setAttribute, model.addAttribute, mav.addObject 와 비슷한 기능.
    // 파일을 클라이언트에 응답으로 보낼때는 render 라는 메서드를 사용합니다
});

app.get('/include', (req, res)=>{
    res.render( 'main' , {title:'Express'} );
});

app.get('/extends', (req, res)=>{
    res.render( 'extends' , {title:'Express'} );
});



app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});