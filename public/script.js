let topLeftCell = document.querySelector('.top-left-cell');
let leftCol = document.querySelector('.left-col');
let topRow = document.querySelector('.top-row');
let cellDiv = document.querySelectorAll('.cell');
let formula = document.querySelector('.formula');
let menuDiv = document.querySelector('.menu');
let menuOptDiv = document.querySelector('.menu-options');
let fontStyle = document.querySelector('.font-style');
let bold = document.querySelector('.bold');
let underline = document.querySelector('.underline');
let italic = document.querySelector('.italic');
let leftAlign = document.querySelector('.left-align');
let rightAlign = document.querySelector('.right-align');
let centerAlign = document.querySelector('.center-align');
let colorPicker = document.querySelector('#favcolor');
let cellColorPicker = document.querySelector('#cell-favcolor');
let fontFamily = document.querySelector('.font-family');
let fontSize = document.querySelector('.font-size');

let username = prompt("Enter your username");
socket.emit('userConnected', username);

let lastSelectedCell;
cellsContentDiv.addEventListener('scroll', function(e){
    let top = e.target.scrollTop;
    let left = e.target.scrollLeft;
    
    
    topRow.style.top = top +"px";
    leftCol.style.left = left + "px";
    topLeftCell.style.top = top + "px";
    topLeftCell.style.left = left + "px";
    
});

for(let i = 0; i<cellDiv.length; i++){
    cellDiv[i].addEventListener('click', findAddress);
    cellDiv[i].onkeydown = arrowKeys;
    cellDiv[i].onkeyup = findAddress;

    cellDiv[i].addEventListener('blur', updateCellObjVal);
    cellDiv[i].addEventListener('keydown', function(e){
        if(e.key == "Backspace"){
            let cell = e.target;
            let {rowId, colId} = getRowidAndColid(cell);

            let cellObj = db[rowId][colId];
            if(cellObj.formula){
                cellObj.value = "";
                cell.textContent = "";
                removeFormula(cellObj);
                
            }
            
        }
    })

    cellDiv[i].addEventListener('keyup', function(e){

        let value = cellDiv[i].textContent;
        socket.emit("cellValue", value);
    })
}

formula.addEventListener('blur', function(e){
    let formulaValue = e.target.value;

    if(formulaValue){
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);
        let cellObj = db[rowId][colId];
        
        if(cellObj.formula){
            removeFormula(cellObj);
        }
        // update database
        cellObj.formula = formulaValue;
        let computedValue = solve(formulaValue, cellObj);
        cellObj.value = computedValue
        
        //update ui
        lastSelectedCell.textContent = computedValue;

        updateChildren(cellObj);

        // updating visited cells
        if(db[rowId][colId].visited){
            return;
        }
        db[rowId][colId].visited = true;
        visitedCells.push({rowId: Number(rowId), colId: Number(colId)});
    }
})

function findAddress(e){
    
    
    
    let rowId = parseInt(e.target.attributes.rowid.textContent);
    let colId = parseInt(e.target.attributes.colid.textContent);
    let cellObj = db[rowId][colId];
    
    // cell selection

    if(document.querySelector('.selected-cell')){
        document.querySelector('.selected-cell').classList.remove('selected-cell');
    }
    document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).classList.add('selected-cell');


    //code for showing selection on top row and left col
    
    if(lastSelectedCell){
        let lrowId = Number(lastSelectedCell.getAttribute('rowid'));
        let lcolId = Number(lastSelectedCell.getAttribute('colid'));
        //console.log(lrowId, lcolId);
        document.querySelector(`div[trid='${lcolId}']`).classList.remove('active-tr-lc');
        document.querySelector(`div[lcid='${lrowId}']`).classList.remove('active-tr-lc');
    }
    
    document.querySelector(`div[trid='${colId}']`).classList.add('active-tr-lc');
    document.querySelector(`div[lcid='${rowId}']`).classList.add('active-tr-lc');


    let addressInput = document.querySelector('.address');
    addressInput.value = String.fromCharCode(colId + 65) + (rowId + 1);
    formula.value = cellObj.formula;
    console.log(cellObj);
    
    // Code for changing fontStyle
    if(cellObj.fontStyle.bold){
        document.querySelector('.bold').classList.add('active-fontStyle');
    }else{
        document.querySelector('.bold').classList.remove('active-fontStyle');
        
    }
    if(cellObj.fontStyle.italic){
        document.querySelector('.italic').classList.add('active-fontStyle');
    }else{
        document.querySelector('.italic').classList.remove('active-fontStyle');
        
    }
    if(cellObj.fontStyle.underline){
        document.querySelector('.underline').classList.add('active-fontStyle');
    }else{
        document.querySelector('.underline').classList.remove('active-fontStyle');
        
    }

    

    if(lastSelectedCell && document.querySelector(`.text-alignment .active-fontStyle`)){
        document.querySelector(`.text-alignment .active-fontStyle`).classList.remove('active-fontStyle');
    }
    if(cellObj.alignment !== ""){
        document.querySelector(`.${cellObj.alignment}-align`).classList.add('active-fontStyle');
    }

    // Code for text color
    
    if(cellObj.textColor){
        
        colorPicker.value = cellObj.textColor;
    }else{
        colorPicker.value = "#000000";
    }

    // code for cell color
    if(cellObj.cellColor){
        
        cellColorPicker.value = cellObj.cellColor;
    }else{
        cellColorPicker.value = "#000000";
    }
    
    // code for selecting the font family from the cell object
    document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).style.fontFamily = cellObj.fontFamily;
    fontFamily.value = cellObj.fontFamily;

    // code for selecting the font size
    document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).style.fontSize = cellObj.fontSize + "px";
    fontSize.value = cellObj.fontSize;


    
    socket.emit('cellinfo', {rowId, colId});
}

function arrowKeys(e){
    let rowId = Number(e.target.getAttribute('rowid'));
    let colId = Number(e.target.getAttribute('colid'));
    let ele;
    
    
    if(e.code == "ArrowUp"){
       
        if(rowId - 1 < 0){
            
            return;
        }
        
        ele = document.querySelector(`[rowid="${rowId - 1 }"][colid="${colId}"]`); 
        ele.focus();
        ele.addEventListener('keypress', function(e){
            if(e.code == "Space"){
                findAddress(e);
                updateCellObjVal(e);
            }
        })
    }
    else if(e.code == "ArrowDown"){
        
        if(rowId + 1 > 99){
            return;
        }
        ele = document.querySelector(`[rowid="${rowId + 1}"][colid="${colId}"]`);
        ele.focus();
        ele.addEventListener('keypress', function(e){
            if(e.code == "Space"){
                findAddress(e);
                updateCellObjVal(e);
            }
        })
    }
    else if(e.code == "ArrowLeft"){
        
        if(colId - 1 < 0){
            return;
        }
        ele = document.querySelector(`[rowid="${rowId}"][colid="${colId - 1}"]`);
        ele.focus();
        ele.addEventListener('keypress', function(e){
            if(e.code == "Space"){
                findAddress(e);
                updateCellObjVal(e);
            }
        })
    }
    else if(e.code == "ArrowRight"){
        
        if(colId + 1 > 25){
            return;
        }
        ele = document.querySelector(`[rowid="${rowId}"][colid="${colId + 1}"]`);
        ele.focus();
        ele.addEventListener('keypress', function(e){
            if(e.code == "Space"){
                findAddress(e);
                updateCellObjVal(e);
            }
        })
    }      
}

function updateCellObjVal(e){
    
    lastSelectedCell = e.target;
    let cellValue = e.target.textContent;

    let rowId = e.target.getAttribute('rowid');
    let colId = e.target.getAttribute('colid');
    
    let cellObj = db[rowId][colId];
    if(cellObj.value == cellValue && !cellObj.formula)
        return;
    
    // db updation
    cellObj.value = cellValue;
    
   
    //children value updation
    updateChildren(cellObj);
    

    // updating visited cells

    if(cellObj.visited){
        return;
    }
    cellObj.visited = true;
    
    visitedCells.push({rowId: rowId, colId: colId});
    console.log(sheetsDb);
}