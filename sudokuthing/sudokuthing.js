var sheet_table = [];
var sheetdataHasLoaded = false;
var sudokudataHasLoaded = false;
var bodyHasLoaded = false;

var offsetX;
var offsetY;
var sudokuID;
var invert;
var rememberedSudokuLocations = [];

var offsetStepSize9;

var colors = [
  "#333333",
  "#eeeeee",
  "#cccccc",
  "#eeeeee",
  "#333333"
];

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
      case 83: case 40: offsetY+=(offsetStepSize9 ? 9 : 1); break;
      case 87: case 38: offsetY-=(offsetStepSize9 ? 9 : 1); break;
      case 68: case 39: offsetX+=(offsetStepSize9 ? 9 : 1); break;
      case 65: case 37: offsetX-=(offsetStepSize9 ? 9 : 1); break;
      case 107: case 171: sudokuID++; break;
      case 109: case 173: sudokuID--; break;
      case 26: case 13: rememberCurrentLocation(); break;
      case 8: case 46: removeLastRememberedLocation(); break;
      case 16: toggleStepSize(); break;
      default: break;
    }
    console.log(e.which);
    checkModifiedInputValues();
    document.getElementById('sudoku-offset-x-input').value = offsetX;
    document.getElementById('sudoku-offset-y-input').value = offsetY;
    document.getElementById('sudoku-num-input').value = sudokuID*1+1;
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

function loadSolvedSheet(){
  clearRememberedLocations();
  for(srw = 0; srw < sheetdata.SudokuOrder.length; srw++){
    for(scl = 0; scl < sheetdata.SudokuOrder[srw].length; scl++){
      rememberedSudokuLocations.push({
        "sID": sheetdata.SudokuOrder[srw][scl] - 1,
        "offX": scl * 9,
        "offY": srw * 9,
        "inv": invert
      });
    }
  }
  hideSelectedSudoku();
  overlaySudoku();
}

function overlaySudoku(){
  clearSheetOverlay();
  updateInputData();
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
      sheet_table[ds_row + offY][ds_col + offX].element.style.background = ((sudokuToOverlay[ds_row][ds_col] > 0)*1 + (inv)*1)%2 ? colors[0] : colors[1];
      sheet_table[ds_row + offY][ds_col + offX].element.style.color = ((sudokuToOverlay[ds_row][ds_col] > 0)*1 + (inv)*1)%2 ? colors[3] : colors[4];
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

function removeLastRememberedLocation(){
  rememberedSudokuLocations.pop();
  overlaySudoku();
}

function clearRememberedLocations(){
  rememberedSudokuLocations = [];
  overlaySudoku();
}

function exportRememberedLocations(){
  if(rememberedSudokuLocations.length){
    var exportStr = btoa(JSON.stringify(rememberedSudokuLocations));
    prompt("please copy this import/export string", exportStr);
  }else{
    alert("There are no locations saved that could be exported.");
  }
}

function importRememberedLocations(){
  var importStr = prompt("please enter the import/export string");
  if(importStr){
    rememberedSudokuLocations = JSON.parse(atob(importStr));
    hideSelectedSudoku();
    overlaySudoku();
  }else{
    alert("invalid import/export string");
  }
}

function importOnLoad(str){
  rememberedSudokuLocations = JSON.parse(atob(importStr));
  hideSelectedSudoku();
  overlaySudoku();
}

function updateInputData(){
  offsetX = document.getElementById('sudoku-offset-x-input').value*1;
  offsetY = document.getElementById('sudoku-offset-y-input').value*1;
  sudokuID = document.getElementById('sudoku-num-input').value*1-1;
  invert = document.getElementById('sudoku-invert-input').checked;
  offsetStepSize9 = document.getElementById('sudoku-offset-jump-input').checked
}

function setSudokuOffset(rw, cl){
  offsetX = cl;
  offsetY = rw;
  checkModifiedInputValues();
  document.getElementById('sudoku-offset-x-input').value = offsetX;
  document.getElementById('sudoku-offset-y-input').value = offsetY;
  overlaySudoku();
}

function setInputValuesFromVariables(){
  document.getElementById('sudoku-offset-x-input').value = offsetX;
  document.getElementById('sudoku-offset-y-input').value = offsetY;
  document.getElementById('sudoku-num-input').value = sudokuID*1+1;
}

function checkModifiedInputValues(){
  sudokuID = Math.max(Math.min(sudokuID, 26), 0); 
  offsetX = Math.max(Math.min(offsetX, sheet_table[0].length-9), 0);
  offsetY = Math.max(Math.min(offsetY, sheet_table.length-9), 0);
}

function toggleStepSize(){
  setOffsetJump(!offsetStepSize9);
}

function setOffsetJump(isJumpEnabled){
  offsetStepSize9 = isJumpEnabled;
  document.getElementById('sudoku-offset-jump-input').checked = offsetStepSize9;
  if(isJumpEnabled){
    document.getElementById('sudoku-offset-x-input').step = "9";
    document.getElementById('sudoku-offset-y-input').step = "9";
  }else{
    document.getElementById('sudoku-offset-x-input').step = "1";
    document.getElementById('sudoku-offset-y-input').step = "1";
  }
}

function openColorOptions(){
  document.getElementById('color-options-button-open').setAttribute("hidden", "hidden");
  document.getElementById('color-options-input-container').removeAttribute("hidden");
}

function closeColorOptions(){
  document.getElementById('color-options-input-container').setAttribute("hidden", "hidden");
  document.getElementById('color-options-button-open').removeAttribute("hidden");
}

function updateColors(){
  colors = [
    document.getElementById('col-inpt-backgr-active').value,
    document.getElementById('col-inpt-backgr-inactive').value,
    document.getElementById('col-inpt-backgr-neutral').value,
    document.getElementById('col-inpt-col-active').value,
    document.getElementById('col-inpt-col-inactive').value
  ];
  document.getElementById('sheet-table').style.background = colors[2];
  overlaySudoku();
}

function defaultColorOptions(){
  colors = [
    "#333333",
    "#eeeeee",
    "#cccccc",
    "#eeeeee",
    "#333333"
  ];
  
  document.getElementById('col-inpt-backgr-active').value = colors[0];
  document.getElementById('col-inpt-backgr-inactive').value = colors[1];
  document.getElementById('col-inpt-backgr-neutral').value = colors[2];
  document.getElementById('col-inpt-col-active').value = colors[3];
  document.getElementById('col-inpt-col-inactive').value = colors[4];
  updateColors();
}

function readabilityPresetColors(){
  colors = [
    "#000000",
    "#eeeeee",
    "#cccccc",
    "#000000",
    "#000000"
  ];
  
  document.getElementById('col-inpt-backgr-active').value = colors[0];
  document.getElementById('col-inpt-backgr-inactive').value = colors[1];
  document.getElementById('col-inpt-backgr-neutral').value = colors[2];
  document.getElementById('col-inpt-col-active').value = colors[3];
  document.getElementById('col-inpt-col-inactive').value = colors[4];
  updateColors();
}

function hideSelectedSudoku(){
  if(rememberedSudokuLocations.length){
    offsetX = rememberedSudokuLocations[0].offX;
    offsetY = rememberedSudokuLocations[0].offY;
    sudokuID = rememberedSudokuLocations[0].sID;
    invert = rememberedSudokuLocations[0].inv;
    setInputValuesFromVariables();
  }else{
    console.log("There's nowhere to hide!");
  }
}

function pre0(s){
  while((""+s).length < 2){
    s = "0" + s;
  }
  return s;
}

/*===============================================================
 PS:
  I know this code is a fucking mess, you don't need to tell me
===============================================================*/