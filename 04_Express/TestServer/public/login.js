document.getElementById("login-form").addEventListener('submit', async (e)=>{
    e.preventDefault();
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    if(!userid){ return alert("아이디를 입력하세요"); }
    if(!pwd){ return alert("패스워드를 입력하세요"); }
    try{
        const result = await axios.post( 'members/login', {userid, pwd} );
        const member = result.data;
        const msg = document.getElementById('msg');
        if( member == null ){
            msg.innerHTML= '아이디가 없습니다';
        }else if( member.pwd != pwd ){
            msg.innerHTML= '비밀번호가 맞지 않습니다';
        }else if( member.pwd == pwd ){
            location.href='/boards';
        }else{
            msg.innerHTML = '알 수 없는 이유로 로그인이 안돼요';
        }
    }catch(err){
        console.error(err);
    }
    e.target.pwd.value = '';
});