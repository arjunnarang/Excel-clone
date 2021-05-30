let cellsContentDiv = document.querySelector(".cells-content");
let cellStylingArr = [];
function constructCells(){

    
    let cellsContent = "<div class='top-left-cell'></div>";

    cellsContent += "<div class='top-row'>";

    for(let i = 0; i<26; i++){
        cellsContent += `<div class='top-row-cell' trid='${i}'>${String.fromCharCode(65+i)}</div>`;

    }
    cellsContent += "</div>";

    cellsContent += "<div class='left-col'>";

    for(let i = 0; i<100; i++){
        cellsContent += `<div class='left-col-cell' lcid='${i}'>${i+1}</div>`;
    }

    cellsContent += "</div>";
    cellsContent += "<div class='cells'>";
    for(let i = 0; i<100; i++){
        let cellRow = '<div class="row">';
        
        for(let j =0; j<26; j++){
            let cellCol = `<div class="cell" rowid='${i}' colid='${j}'contentEditable="true" active='false'></div>`;
            cellRow += cellCol;
        }
        cellRow += "</div>";
        cellsContent += cellRow;
    }
    cellsContent += "</div>";

    cellsContentDiv.innerHTML = cellsContent;
    
}

constructCells();

let sheetsDb = [];
let db; // active sheet database
let visitedCells = [];
function constructDb(){
    newSheetDb = [];

    for(let i = 0; i<100; i++){
        let row = [];
        for(let j =0; j<26; j++){
            let name = String.fromCharCode(j+65) + (i+1);
            let obj = {
                name: name,
                value: "",
                formula: "",
                children: [],
                parents: [],
                visited: false,
                fontStyle : {bold:false , italic:false , underline:false, },
                // alignment: {leftAlign:false, rightAlign:false, middleAlign:false},
                alignment: "",
                textColor: "",
                cellColor: "",
                fontFamily: "arial",
                fontSize: 16,
            }
            row.push(obj);
        }
        newSheetDb.push(row);
    }
    visitedCells = [];
    db = newSheetDb;
    sheetsDb.push({db: newSheetDb, visitedCells: visitedCells});
    console.log(sheetsDb);
}

constructDb();