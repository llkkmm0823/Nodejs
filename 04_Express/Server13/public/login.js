document.getElementById("login-form").addEventListener('submit',async(e)=>{
    e.preventDefault();  // 끝까지 진행되서 화면전환이 일어나지 전에 submit을 멈춰라
    const userid = e.target.userid.value;
    const pwd = e.target.pwd.value;
    if(!userid){ return alert("아이디를 입력하세요");}
    if(!pwd){ return alert("비밀번호를 입력하세요");}

    // 서버에 userid,pwd를 보내서 로그인 인증을 하고, 그 사용자의 모든 정보를 객체에 담아올 예정임.
    try{
         const result = await axios.post('members/login',{userid,pwd} );
         const member = result.data
         const message = document.getElementById('msg');
         if( member == null){
            msg.innerHTML= '아이디가 없읍니다.';
         }else if( member.pwd != pwd){
            msg.innerHTML= '비밀번호가 맞지 않읍니다.';
         }else if( member.pwd == pwd){
            location.href='/boards';
         }else{
            msg.innerHTML = '알 수 없는 로그인 에러'
         }
        }catch(err){
            console.error(err);
        } 
        e.target.pwd.value= ''; // 로그인이 잘 안되었을떄, pwd만 비움.
});