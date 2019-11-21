var sheet_table = [[]];
var sheetdataHasLoaded = false;
var sudokudataHasLoaded = false;
var bodyHasLoaded = false;

function sheetdataLoaded(){sheetdataHasLoaded = true; hasLoaded();}
function sudokudataLoaded(){sudokudataHasLoaded = true; hasLoaded();}
function bodyLoaded(){bodyHasLoaded = true; hasLoaded();}

function hasLoaded(){
  console.log(1*(sheetdataHasLoaded + sudokudataHasLoaded + bodyHasLoaded + 1) + "/4 resources have loaded...");
  if(sheetdataHasLoaded + sudokudataHasLoaded + bodyHasLoaded == 3){
    init();
  }
}

function init(){
  console.log("script/JSON resources ready!");
  buildSheetDisplay();
}

function buildSheetDisplay(){
  let tableElement = document.getElementById('sheet-table');
  
  while(tableElement.firstChild){
    tableElement.removeChild(tableElement.firstChild);
  }
  
  for(row = 0; row < sheetdata.sheet.length; row++){
    let tr = document.createElement('tr');
    sheet_table[row] = [];
    for(col = 0; col < sheetdata.sheet[row].length; col++){
      let td = document.createElement('td');
      td.innerHTML = sheetdata.sheet[row][col];
      sheet_table[row][col] = {
        "element": td,
        "value": sheetdata.sheet[row][col]
      }
      tr.appendChild(td);
    }
    tableElement.appendChild(tr);
  }
}

function clearSheetOverlay(){
  let sheet_row, sheet_col;
  for(sheet_row = 0; sheet_row < sheet_table.length; sheet_row++){
    for(sheet_col = 0; sheet_col < sheet_table[sheet_row].length; sheet_col++){
      sheet_table[sheet_row][sheet_col].element.style.background = "";
    }
  }
}

function overlaySudoku(){
  clearSheetOverlay();
  var offsetX = document.getElementById('sudoku-offset-x-input').value*1;
  var offsetY = document.getElementById('sudoku-offset-y-input').value*1;
  var sudokuID = document.getElementById('sudoku-num-input').value*1-1;
  var invert = document.getElementById('sudoku-invert-input').checked;
  document.getElementById('sudoku-image').src="";
  document.getElementById('sudoku-image').src="sudokuimages/sudoku_" + (invert ? "inv_" : "") + pre0(sudokuID) + ".png";
  
  var sudokuToOverlay = sudokudata.raw[sudokuID];
  for(s_row = 0; s_row < sudokuToOverlay.length && s_row + offsetY < sheet_table.length; s_row++){
    for(s_col = 0; s_col < sudokuToOverlay[s_row].length && s_col + offsetX < sheet_table[s_row + offsetY].length; s_col++){
      sheet_table[s_row + offsetY][s_col + offsetX].element.style.background = ((sudokuToOverlay[s_col][s_row] > 0)*1 + (invert)*1)%2 ? "#333" : "#eee";
    }
  }
}

function pre0(s){
  while((""+s).length < 2){
    s = "0" + s;
  }
  return s;
}