var analyzedUnitIDs = [];
var charCount = {};

function start(){
  console.log("creating UnitID data...");
  var uIDs = unitIDs.unit_ids;
  let nums, chars;
  for(i = 0; i < uIDs.length; i++){
    chars = uIDs[i].replace(/[0-9]|-/g, "").length;
    nums = uIDs[i].replace(/[A-Z]|-/g, "").length;
    charRatio = Math.floor(10000 * chars/(nums + chars))/100
    numRatio = Math.floor(10000 * nums/(nums + chars))/100
    analyzedUnitIDs.push(
      {
        "id": uIDs[i],
        "chars": chars,
        "nums": nums,
        "charRatio": charRatio,
        "numRatio": numRatio
      }
    );
    for(k = 0; k < uIDs[i].length; k++){
      charCount[uIDs[i][k]] = (charCount[uIDs[i][k]] + 1) || 1;
    }
  }
  console.log("done.");
}

function sortAndPrintAnalyzedUnitIDsByKeyID(keyID){
  key = Object.keys(analyzedUnitIDs[0])[keyID];
  if(!key){return;}
  console.log("sorting by key: " + key);
  analyzedUnitIDs.sort(
    function(a, b){
      return b[key] - a[key];
    }
  );
  analyzedUnitIDs.forEach(
    uid => console.log(uid.id + " " + uid[key])
  );
  console.log("end of key: " + key);
}

function getSortedCharCount(){
  let charCountArr = [];
  Object.keys(charCount).forEach(
    k => charCountArr.push(
      {
        "char": k,
        "count": charCount[k]
      }
    )
  );
  charCountArr.sort(
    function(a, b){
      return b.count - a.count;
    }
  );
  //charCountArr.forEach(c => console.log("'" + c.char + "':\t" + c.count))
  return charCountArr;
}