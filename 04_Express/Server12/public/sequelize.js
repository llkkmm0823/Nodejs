getUsers();
getComments();


document.getElementById('user-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = e.target.username.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;
    if(!name){return alert('이름을 입력하세요');}
    if(!age){return alert('나이를 입력하세요');}

    try{
        await axios.post('/users/insert', {name, age, married});
        getUsers();
    }catch(e){
        console.log(e);
    }
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});

async function getUsers(){
    try{
        // 모든 user 를 조회해서 user-list 테이블에 표시합니다
        const result = await axios.get('/users');
        const users = result.data;

        const tbody = document.querySelector("#user-list tbody");
        tbody.innerHTML='';
        users.map( 
            (user)=>{
                const row = document.createElement('tr'); // tr 태그 생성

                let td = document.createElement('td');  // td 태그 생성
                td.textContent = user.id;   // 생성된 td 태그에 user 의 id 삽입
                row.appendChild(td);        // tr 안에 td  삽입

                td = document.createElement('td'); 
                td.textContent = user.name;
                row.appendChild(td); 

                td = document.createElement('td'); 
                td.textContent = user.age;
                row.appendChild(td); 

                td = document.createElement('td'); 
                td.textContent = user.married ? '기혼' : '미혼';
                row.appendChild(td); 

                tbody.appendChild(row); // 완성된 tr 을  tbody 에 추가

            } 
        );


    }catch(err){
        console.log(err);
    }
}



document.getElementById('comment-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;

    if (!id){ return alert('아이디를 입력하세요');  }
    if (!comment){ return alert('댓글을 입력하세요');  }

    try {
        await axios.post('/comments/insert', { id, comment });
        getComments();
    } catch (err) {
        console.error(err);
    }
    e.target.userid.value = '';
    e.target.comment.value = '';
});


async function getComments(){
    try{
        const result = await axios.get('/comments');
        const comments = result.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        console.log(comments);

        comments.map( 
            (comment)=>{
                const row = document.createElement('tr');

                let td = document.createElement('td');
                td.textContent = comment.id; // 댓글번호
                row.appendChild(td);

                td = document.createElement('td');
                td.textContent = comment.User.name; 
                // td.textContent = comment.commenter
                row.appendChild(td);

                td = document.createElement('td');
                td.textContent = comment.comment;
                row.appendChild(td);

                // 수정-삭제 버튼
                const edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', async (e)=>{
                    const newComment = prompt('바꿀 내용을 입력하세요');
                    if(!newComment) { return alert('내용을 반드시 입력하셔야 합니다'); }
                    try{
                        // http://localhost:3000/comments/update/3
                        await axios.patch(`/comments/update/${comment.id}` , {comment:newComment} );
                        getComments();
                    }catch(e){
                        console.error(e);
                    }

                });
                const remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click',async(e)=>{
                    try{
                        await axios.delete(`/comments/delete/${comment.id}`);
                        getComments();
                    }catch(err){
                        console.error(err);
                    }
                });
                td = document.createElement('td');  // td 생성
                td.appendChild(edit);  // 버튼을 td 에 추가
                row.appendChild(td);  // 버튼이 든 td 를 tr 에 추가
                td = document.createElement('td');
                td.appendChild(remove);
                row.appendChild(td);

                row.addEventListener('click',()=>{
                    //현재 사용자의 아이디로 comment 테이블을 검색
                    //그 결과를 comment-list테이블에 재 출력 (수정-삭제 버튼 포함)
                    getCommentByid(user.id);
                    //현재 행의 사용자 id를 전달인수로 전달
                });

                tbody.appendChild(row); // row가 tbody에 들어가면서 하나의 줄에 들어가고 있음
            }
        );
    }catch(err){
        console.error(err);
    }
}

async function getCommentByid(id){
    try{
        const result = await axios.get(`comments/search/${id}`);
        const comments = result.data;
        const tbody = document.querySelector("#user-list tbody");
        tbody.innerHTML='';
        users.map( 
            (user)=>{
                const row = document.createElement('tr'); // tr 태그 생성

                let td = document.createElement('td');  // td 태그 생성
                td.textContent = user.id;   // 생성된 td 태그에 user 의 id 삽입
                row.appendChild(td);        // tr 안에 td  삽입

                td = document.createElement('td'); 
                td.textContent = user.name;
                row.appendChild(td); 

                td = document.createElement('td'); 
                td.textContent = user.age;
                row.appendChild(td); 

                td = document.createElement('td'); 
                td.textContent = user.married ? '기혼' : '미혼';
                row.appendChild(td); 

                tbody.appendChild(row); // 완성된 tr 을  tbody 에 추가

            } 
        );


    }catch(err){
        console.log(err);
    }
}



document.getElementById('comment-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const id = e.target.userid.value;
    const comment = e.target.comment.value;

    if (!id){ return alert('아이디를 입력하세요');  }
    if (!comment){ return alert('댓글을 입력하세요');  }

    try {
        await axios.post('/comments/insert', { id, comment });
        getComments();
    } catch (err) {
        console.error(err);
    }
    e.target.userid.value = '';
    e.target.comment.value = '';
});


async function getComments(){
    try{
        const result = await axios.get('/comments');
        const comments = result.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        console.log(comments);

        comments.map( 
            (comment)=>{
                const row = document.createElement('tr');

                let td = document.createElement('td');
                td.textContent = comment.id; // 댓글번호
                row.appendChild(td);

                td = document.createElement('td');
                td.textContent = comment.User.name; 
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = comment.comment;
                row.appendChild(td);
                const edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', async (e)=>{
                    const newComment = prompt('바꿀 내용을 입력하세요');
                    if(!newComment) { return alert('내용을 반드시 입력하셔야 합니다'); }
                    try{
                        await axios.patch(`/comments/update/${comment.id}` , {comment:newComment} );
                        getComments();
                    }catch(e){
                        console.error(e);
                    }
                });
                const remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click',async(e)=>{
                    try{
                        await axios.delete(`/comments/delete/${comment.id}`);
                        getComments();
                    }catch(err){
                        console.error(err);
                    }
                });
                td = document.createElement('td');
                td.appendChild(edit); 
                row.appendChild(td); 
                td = document.createElement('td');
                td.appendChild(remove);
                row.appendChild(td);

                row.addEventListener('click',()=>{
                    getCommentByid(user.id);
                });
                tbody.appendChild(row);
            }
        );

    }catch(e){

    }
}