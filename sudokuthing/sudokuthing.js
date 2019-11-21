var sheet_table = [];
var sheetdataHasLoaded = false;
var sudokudataHasLoaded = false;
var bodyHasLoaded = false;

var offsetX;
var offsetY;
var sudokuID;
var invert;
var rememberedSudokuLocations = [];

//i hate how i wrote this
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
  document.getElementById('sheet-table').onclick = function(e){
    setSudokuOffset(
      e.target.id.split("_")[0]*1,
      e.target.id.split("_")[1]*1
    );
  };
  document.body.onkeydown = function(e){
    switch(e.which){
      case 40: offsetY++; break;
      case 38: offsetY--; break;
      case 39: offsetX++; break;
      case 37: offsetX--; break;
    }
    checkOffsetValues();
    document.getElementById('sudoku-offset-x-input').value = offsetX;
    document.getElementById('sudoku-offset-y-input').value = offsetY;
    overlaySudoku();
  }
  updateInputData();
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
      td.id = pre0(row) + "_" + pre0(col);
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
      sheet_table[sheet_row][sheet_col].element.style.color = "";
    }
  }
}

function overlaySudoku(){
  clearSheetOverlay();
  updateInputData();
  document.getElementById('sudoku-image').src="";
  document.getElementById('sudoku-image').src="sudokuimages/sudoku_" + (invert ? "inv_" : "") + pre0(sudokuID) + ".png";
  
  for(r = 0; r < rememberedSudokuLocations.length; r++){
    drawSudokuOverlayFromObject(rememberedSudokuLocations[r]);
  }
  
  drawSudokuOverlay(sudokuID, offsetX, offsetY, invert);
}

function drawSudokuOverlayFromObject(rem){
  drawSudokuOverlay(
    rem.sID,
    rem.offX,
    rem.offY,
    rem.inv
  );
}

function drawSudokuOverlay(sID, offX, offY, inv){
  var sudokuToOverlay = sudokudata.raw[sID];
  for(ds_row = 0; ds_row < sudokuToOverlay.length && ds_row + offY < sheet_table.length; ds_row++){
    for(ds_col = 0; ds_col < sudokuToOverlay[ds_row].length && ds_col + offX < sheet_table[ds_row + offY].length; ds_col++){
      sheet_table[ds_row + offY][ds_col + offX].element.style.background = ((sudokuToOverlay[ds_row][ds_col] > 0)*1 + (inv)*1)%2 ? "#333" : "#eee";
      sheet_table[ds_row + offY][ds_col + offX].element.style.color = ((sudokuToOverlay[ds_row][ds_col] > 0)*1 + (inv)*1)%2 ? "#eee" : "#333";
    }
  }
}

function rememberCurrentLocation(){
  rememberedSudokuLocations.push({
    "sID" : sudokuID,
    "offX": offsetX,
    "offY": offsetY,
    "inv": invert
  });
}

function updateInputData(){
  offsetX = document.getElementById('sudoku-offset-x-input').value*1;
  offsetY = document.getElementById('sudoku-offset-y-input').value*1;
  sudokuID = document.getElementById('sudoku-num-input').value*1-1;
  invert = document.getElementById('sudoku-invert-input').checked;
}

function setSudokuOffset(rw, cl){
  offsetX = cl;
  offsetY = rw;
  checkOffsetValues();
  document.getElementById('sudoku-offset-x-input').value = offsetX;
  document.getElementById('sudoku-offset-y-input').value = offsetY;
  overlaySudoku();
}

function checkOffsetValues(){
  offsetX = Math.max(Math.min(offsetX, sheet_table[0].length-9), 0);
  offsetY = Math.max(Math.min(offsetY, sheet_table.length-9), 0);
}

function pre0(s){
  while((""+s).length < 2){
    s = "0" + s;
  }
  return s;
}