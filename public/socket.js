socket.on('realtime', function(cellObj){
    let {username, rowId, colId} = cellObj;
    if(document.querySelector('.real-time')){
        document.querySelector('.real-time').classList.remove('real-time');
        document.querySelector('.username-div').remove();
    }
    let usernameDiv = document.createElement('div');
    usernameDiv.classList.add('username-div');
    usernameDiv.textContent = username;
    usernameDiv.setAttribute('contenteditable', false);
    let realTimeCell = document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`);
    realTimeCell.classList.add('real-time');
    realTimeCell.append(usernameDiv);
})

socket.on("setCellValue", function(value){
    let realTimeCell = document.querySelector('.real-time');
    if(realTimeCell.childNodes.length == 1){
        let cellHtml = realTimeCell.childNodes[0];
        realTimeCell.textContent = value;
        realTimeCell.append(cellHtml);
    }else{
        let cellHtml = realTimeCell.childNodes[1];
        realTimeCell.textContent = value;
        realTimeCell.append(cellHtml);
    }
})