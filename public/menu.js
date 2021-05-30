colorPicker.addEventListener('input', updateTextColor);
cellColorPicker.addEventListener('input', updateCellColor);
fontFamily.addEventListener('change', function(e){
    if(lastSelectedCell){
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);
        let cellObj = db[rowId][colId];
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).style.fontFamily = `${fontFamily.value}`;
        cellObj.fontFamily = fontFamily.value;
    }
})

fontSize.addEventListener('change', function(e){
    if(lastSelectedCell){
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);
        let cellObj = db[rowId][colId];
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).style.fontSize = fontSize.value + "px";
        cellObj.fontSize = fontSize.value;
    }
})

leftAlign.addEventListener('click', function(e){
    
    if(lastSelectedCell){
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);

        let cellObj = db[rowId][colId];
        // cellObj.alignment = "left";
        

        if(leftAlign.classList.contains('active-fontStyle')){
            leftAlign.classList.remove('active-fontStyle');
            cellObj.alignment= "";
            lastSelectedCell.style.textAlign = '';
        }
        else{
            if(document.querySelector(`.text-alignment .active-fontStyle`))
                document.querySelector(`.text-alignment .active-fontStyle`).classList.remove('active-fontStyle');
            cellObj.alignment="left";
            lastSelectedCell.style.textAlign = 'left';
            
            leftAlign.classList.add('active-fontStyle');
           
        }
        console.log(cellObj);
    }
})

rightAlign.addEventListener('click', function(e){
    if(lastSelectedCell){
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);

        let cellObj = db[rowId][colId];
        //cellObj.alignment = "right";
        
        
        if(rightAlign.classList.contains('active-fontStyle')){
            rightAlign.classList.remove('active-fontStyle');
            cellObj.alignment = "";
            lastSelectedCell.style.textAlign = '';
        }
        
        else{
            if(document.querySelector(`.text-alignment .active-fontStyle`))
                document.querySelector(`.text-alignment .active-fontStyle`).classList.remove('active-fontStyle');
            cellObj.alignment = "right";
            lastSelectedCell.style.textAlign = 'right';
            
            rightAlign.classList.add('active-fontStyle');
            // middleAlign.classList.remove('active-fontStyle');
            // leftAlign.classList.remove('active-fontStyle');
            
        }
        console.log(cellObj);
    }
        
})
centerAlign.addEventListener('click', function(e){
    if(lastSelectedCell){
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);

        let cellObj = db[rowId][colId];
        // cellObj.alignment ;
        // cellObj.alignment.rightAlign = false;

        // ui update
        if(centerAlign.classList.contains('active-fontStyle')){
            centerAlign.classList.remove('active-fontStyle');
            cellObj.alignment = "";
            lastSelectedCell.style.textAlign = '';
        }
        else{
            if(document.querySelector(`.text-alignment .active-fontStyle`))
                document.querySelector(`.text-alignment .active-fontStyle`).classList.remove('active-fontStyle');
            cellObj.alignment = "center";
            lastSelectedCell.style.textAlign = 'center';
            
            centerAlign.classList.add('active-fontStyle');
            // rightAlign.classList.remove('active-fontStyle');
            // leftAlign.classList.remove('active-fontStyle');
        }
        console.log(cellObj);
    }
    
})
// menuDiv.addEventListener('click', function(e){
//     if(e.target.classList.contains('menu')){
//         return;
//     }
    
//     if(e.target.classList.contains('active-menu')){
//         return;
//     }

//     document.querySelector('.active-menu').classList.remove('active-menu');
//     e.target.classList.add('active-menu');

//     if(e.target.classList.contains('home')){
//         document.querySelector('.home-menu-options').classList.remove('hide');
//         document.querySelector('.file-menu-options').classList.add('hide');

//     }
//     if(e.target.classList.contains('file')){
//         document.querySelector('.file-menu-options').classList.remove('hide');
//         document.querySelector('.home-menu-options').classList.add('hide');

//     }
// })

bold.addEventListener('click', function(e){
    setFontStyle('bold', bold);
})

underline.addEventListener('click', function(e){
    setFontStyle('underline', underline);
})

italic.addEventListener('click', function(e){

    setFontStyle('italic', italic);
})

function setFontStyle(fontStyling, styleName){

    if(lastSelectedCell){
        
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);
        let cellObj = db[rowId][colId];
        if(!cellStylingArr.includes({rowId: rowId, colId: colId})){
            cellStylingArr.push({rowId: rowId, colId: colId});
            
        }
        
        if(fontStyling == 'bold'){
            if(cellObj.fontStyle[fontStyling]){
                lastSelectedCell.style.fontWeight = '';
                
            }
            else{
                lastSelectedCell.style.fontWeight = fontStyling;
            }

            cellObj.fontStyle[fontStyling] = !cellObj.fontStyle[fontStyling];
    
        }
        else if (fontStyling == 'underline'){
            if(cellObj.fontStyle[fontStyling]){
                lastSelectedCell.style.textDecoration = '';  
            }
            else{
                lastSelectedCell.style.textDecoration = fontStyling;
            }

            cellObj.fontStyle[fontStyling] = !cellObj.fontStyle[fontStyling];
        }else{
            if(cellObj.fontStyle[fontStyling]){
                lastSelectedCell.style.fontStyle = '';
                
            }
            else{
                lastSelectedCell.style.fontStyle = fontStyling;
            }
            cellObj.fontStyle[fontStyling] = !cellObj.fontStyle[fontStyling];
    
        }

        if(styleName.classList.contains('active-fontStyle')){
            styleName.classList.remove('active-fontStyle');
        }
        else{
            styleName.classList.add('active-fontStyle');
        }
    }
}

function updateTextColor(){
    if(lastSelectedCell){
        //database changes
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);
        let cellObj = db[rowId][colId];
        
        cellObj.textColor = colorPicker.value;
        

        //ui changes
        lastSelectedCell.style.webkitTextFillColor = colorPicker.value;
        
    }

}

function updateCellColor(){
    if(lastSelectedCell){
        let {rowId, colId} = getRowidAndColid(lastSelectedCell);
        let cellObj = db[rowId][colId];
        
        cellObj.cellColor = cellColorPicker.value;
        

        //ui changes
        lastSelectedCell.style.background = cellColorPicker.value;
    }
}

