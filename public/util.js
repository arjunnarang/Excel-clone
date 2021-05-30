function solve(formula, selfCellObj){
    
    let formulaComps = formula.split(" ");
    
    for(let i = 0; i < formulaComps.length; i++){
        let comp = formulaComps[i];
        if(comp[0] >= 'A' && comp[0] <= 'Z'){
            let {rowId, colId} = getRowidAndColidFromAdd(comp);
            let cellObj = db[rowId][colId];
            
            formula = formula.replace(comp, cellObj.value);
            if(selfCellObj){
                //updating A1/A2(cells used in formula) and adding B1(last selected cell) to its children means B1 is a child of A1 && A2
                cellObj.children.push(selfCellObj.name);
                selfCellObj.parents.push(cellObj.name);
            }
            
            
        }
    }
    
    let computedValue = eval(formula);
            return computedValue;
}


function getRowidAndColid(lastSelectedCell){
    let rowId = Number(lastSelectedCell.getAttribute('rowid'));
    let colId = Number(lastSelectedCell.getAttribute('colid'));

    return {
        rowId,
        colId
    }
}

function getRowidAndColidFromAdd(comp){

    //B22 -> colid, rowid
    let rowId = Number(comp.substring(1)) - 1 ;
    let colId = comp.charCodeAt(0) - 65;
    
    return {
        rowId,
        colId
    }
}

function updateChildren(cellObj){
    for(let i = 0; i<cellObj.children.length; i++){
        let childrenCellObjName = cellObj.children[i];

        let {rowId, colId} = getRowidAndColidFromAdd(childrenCellObjName);

        let childrenCellObj = db[rowId][colId];

        let childrenCellObjNewVal = solve(childrenCellObj.formula);
        
        childrenCellObj.value = childrenCellObjNewVal;
        document.querySelector(`div[rowid='${rowId}'][colid='${colId}']`).textContent = childrenCellObjNewVal;
        updateChildren(childrenCellObj);
    }
}

function removeFormula(cellObj){
    formula.value = "";

    for(let i = 0; i<cellObj.parents.length; i++){
        let parentName = cellObj.parents[i];

        let {rowId, colId} = getRowidAndColidFromAdd(parentName);
        parentObj = db[rowId][colId];

        let updatedChildren = parentObj.children.filter(ele => ele != cellObj.name);

        parentObj.children = updatedChildren;
    }
    cellObj.parents = [];
    cellObj.formula = "";
    
}