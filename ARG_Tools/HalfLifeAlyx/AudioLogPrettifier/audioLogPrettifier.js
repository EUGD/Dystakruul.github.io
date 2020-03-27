var loginput;
var prettyoutput;
var nolinebreaks;
var radiotag;
var printalphanum;
var printspecial;
var forceuppercase;

function init(){
  loginput = document.querySelector("#input");
  prettyoutput = document.querySelector("#output");
  nolinebreaks = document.querySelector("#nolinebreaks");
  radiotag = document.querySelector("#radiotag");
  printalphanum = document.querySelector("#printalphanum");
  printspecial = document.querySelector("#printspecial");
  forceuppercase = document.querySelector("#forceuppercase");
}

function prettify(){
  let logdata = loginput.value;
  logdata = logdata.replace(/\[.*\]\s*sounds(?:\\[a-z0-9_]+)+(\\[a-z0-9_]+)\.vsnd.*/g, "$1"); //isolate filename
  
  //handle/pretty-print radio audio events
  logdata = logdata.replace(/\\radio_/g, radiotag.checked ? "[RADIO] " : ""); //
  logdata = logdata.replace(/male_number_station_([0-9]{1,2})_01/g, printalphanum.checked ? "$1" : ""); //numbers
  logdata = logdata.replace(/male_number_station_([a-z])_01/g, printalphanum.checked ? "$1" : ""); //letters
  logdata = logdata.replace(/male_number_station_and_([0-9]+)/g, printspecial.checked ? "[&$1]" : "");
  logdata = logdata.replace(/number_station_terminator_low_01_([0-9]+)/g, printspecial.checked ? "[TL$1]" : "");
  logdata = logdata.replace(/number_station_terminator_synthy_([0-9]+)/g, printspecial.checked ? "[TS$1]" : "");
  logdata = logdata.replace(/number_station_connector_low_01_([0-9]+)/g, printspecial.checked ? "[CL$1]" : "");
  logdata = logdata.replace(/^(\r\n)+/, "").replace(/^\n+/, "");
  logdata = logdata.replace(/(\r\n)+/g, "\r\n").replace(/\n+/g, "\n");
  if(nolinebreaks.checked) logdata = logdata.replace(/\r\n/g, ", ").replace(/\n/g, ", ");
  if(forceuppercase.checked) logdata = logdata.toUpperCase();
  prettyoutput.value = logdata;
}