let addSheet = document.querySelector('.add-sheet');
let allSheets = document.querySelector('.sheets-list');
let sheets = document.querySelectorAll('.sheet');

let sheetNo = 0;
addSheet.addEventListener('click', function(e){
    sheetNo++;
    document.querySelector('.active-sheet').classList.remove('active-sheet');
    let sheetDiv = document.createElement('div');
    
    sheetDiv.classList.add('sheet');
    sheetDiv.classList.add('active-sheet');
    sheetDiv.setAttribute('sheetid', sheetNo);
    sheetDiv.innerHTML = `Sheet ${sheetNo+1}`;
    allSheets.append(sheetDiv);
    
    // cleaning the ui while adding a new sheet
    initUi();

    constructDb();
    cellStyling();
})


allSheets.addEventListener('click', function(e){
    if(e.target.classList.contains('active-sheet')){
        return;
    }
    document.querySelector('.active-sheet').classList.remove('active-sheet');
    e.target.classList.add('active-sheet');
    let sheetId = e.target.getAttribute('sheetid');

    
    // clearing the ui
    initUi()
    db = sheetsDb[sheetId].db;
    visitedCells = sheetsDb[sheetId].visitedCells;
    
    //putting respective sheet values in the ui
    setUi();
    cellStyling();
})


function setUi(){
    
    //updating the ui while switching between the sheets
    for(let i = 0; i<visitedCells.length; i++){
        let{rowId, colId} = visitedCells[i];
        let cellObj = db[rowId][colId];
        for(let key in cellObj.fontStyle){
            if(key){
                setFontStyle(`${key}`, key);
                //console.log(key);
            }
        }
        document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).innerHTML = db[rowId][colId].value;

        
    }
}

function initUi(){
    for(let i = 0; i<visitedCells.length; i++){
        let {rowId, colId} = visitedCells[i];
        document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).innerHTML = "";
        
    }
}

function cellStyling(){

    bold.classList.remove('active-fontStyle');
    underline.classList.remove('active-fontStyle');
    italic.classList.remove('active-fontStyle');
    console.log(cellStylingArr);
    for(let i =0; i<cellStylingArr.length; i++){
        let {rowId, colId} = cellStylingArr[i];
       document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).style = "";
    }
}