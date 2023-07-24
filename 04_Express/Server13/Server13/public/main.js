getBoard_list();

// 데이터베이스에서 게시물들을 읽어와서 table의 tbody에 tr과 td로 삽입해 넣는 함수
async function getBoard_list(){
    try{
        const result = await axios.get('/boards/boardList');
        const boards = result.data;


        const tbody = document.querySelector('#aboard-list tbody');
        tbody.innerHTML='';
        boards.map(async(board)=>{
                  
            const row = document.createElement('td');
            td.textContent = board.id;
            td.id = 'boardnum';
            row.appendChild(td);// 게시물 번호


            td = document.createElement('td');
            td.textContent = board.create_at;
            td.id = 'created_at';
            row.appendChild(td);
        
            
            td = document.createElement('td');
            td.textContent = board.writer;
            td.id = 'writer';
            row.appendChild(td);    // 작성자


        
            td = document.createElement('td');
            td.textContent = board.create_at;
            td.id = 'created_at';     // 작성일
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = board.readCount;
            td.id = 'readeCount';   // 조회수
            row.appendChild(td);

            tbody.appendChild(row);
        });



    }catch(err){
        console.error(err);
    }
}