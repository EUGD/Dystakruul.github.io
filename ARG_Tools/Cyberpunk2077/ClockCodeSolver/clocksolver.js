const numstringParts = ["TWELVE", "ELEVEN", "TEN", "NINE", "EIGHT", "SEVEN", "SIX", "FIVE", "FOUR", "THREE", "TWO", "ONE"];

function solveClockCode(str){
  str = str || document.getElementById('clock-input').value;
  str = str || "YQSZUPJWKJYYEMMLVWOCVGSCWHCZMJOGBDKRSTXTSCOUQPQJSDK";
  let strAsNumbers = stringToNumbers(str);
  let numstringAsNumbers = stringToNumbers(getNumstring(str.length));
  console.log(str);
  console.log(getNumstring(str.length));
  console.log(strAsNumbers);
  console.log(numstringAsNumbers);
  let addedNumberArrays = strAsNumbers.map((n, i) => +n + numstringAsNumbers[i]);
  let sumAsString = numbersToString(addedNumberArrays);
  document.getElementById('clock-output').innerHTML += "<br>" + sumAsString;
  return sumAsString;
}

function getNumstring(len){
  let numstring = "";
  for(i = 0; numstring.length < len; i++){
    numstring = numstringParts[i] + numstring;
  }
  return numstring;
}

function stringToNumbers(str){
  return str.toUpperCase().split("").map(c => c.charCodeAt() - 64);
}

function numbersToString(numArr){
  return numArr.map(n => String.fromCharCode(((+n % 26) || 26) + 64)).join("");
}
