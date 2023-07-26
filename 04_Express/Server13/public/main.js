getBoard_list();

// 데이터베이스에서 게시물들을 읽어와서  table 의 tbody 에 tr 과 td로 삽입해넣는 함수
async function getBoard_list(page){
    if(page == undefined){page=1;}
    try{
        const result = await axios.get(`/boards/boardList/${page}`);
        const boards = result.data.boardList;
        const paging = result.data.paging;

        const tbody = document.querySelector('#board-list tbody');
        tbody.innerHTML='';
        boards.map( async (board)=>{
            const row = document.createElement('tr');

            let td = document.createElement('td');
            td.textContent = board.id;
            td.id = 'boardnum';
            row.appendChild( td ); // 게시물 번호

            td = document.createElement('td');
            let tContent = board.subject;
            // 해당 게시물의 댓글 갯수를 조회해서 제목옆에 붙여넣을 예정
            try{
                const result = await axios.get(`boards/replycnt/${board.id}`);
                const data  = result.data;
                let cnt = data.cnt;
                if(cnt!=0){
                    tContent = tContent + ' <span style="color:red;font-weight:bold">[' + cnt + ']</span>'; 
                } 
            }catch(err){console.error(err);}
            td.innerHTML = tContent;
            // td.addEventListener(); 게시물 제목을 클릭하면 게시물보기 이동
            row.appendChild(td);   // 게시물 제목

            td = document.createElement('td');  
            td.textContent = board.writer; 
            td.id = 'writer';
            row.appendChild(td);    // 작성자

            td = document.createElement('td');
            tContent = board.created_at;
            td.textContent = tContent.substr(0,10);
            td.id = 'created_at';
            row.appendChild(td);    // 작성일

            td = document.createElement('td');  
            td.textContent = board.readCount; 
            td.id = 'readCount';
            row.appendChild(td);  // 조회수

            row.addEventListener('click', ()=>{
                location.href = `/boards/boardView/${board.id}`;
            });

            tbody.appendChild(row);   // 완성된 행을  tbody에 삽입
        });

        const pageArea = document.querySelector('#page');
        pageArea.innerHTML = '' ;
        if(paging.prev){ //prev 버튼
            pageArea.innerHTML += `<a href="#" onClick="getBoard_list('${paging.beginPage-1}')">&nbsp;&nbsp;◀</a>`;
        }
        for(let i =paging.beginPage; i<=paging.endPage; i++){
            if(paging.page==i){
                pageArea.innerHTML += `<span style="color:red;">&nbsp;${i}&nbsp;</span>`;
            }else{
                pageArea.innerHTML += `<a href="#" onClick="getBoard_list('${i}')">&nbsp; ${i}&nbsp;</a>`;
            }
        }
        if(paging.next){ //next 버튼
            pageArea.innerHTML += `<a href="#" onClick="getBoard_list('${paging.endPage+1}')">&nbsp;&nbsp;▶</a>`
        }

    }catch(err){
        console.error(err);
    }
}