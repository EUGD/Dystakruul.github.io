var loginput;
var prettyoutput;

function init(){
  loginput = document.querySelector("#input");
  prettyoutput = document.querySelector("#output");
}

function prettify(){
  let logdata = loginput.value;
  logdata = logdata.replace(/\[.*\]\s*sounds(?:\\[a-z0-9_]+)+(\\[a-z0-9_]+)\.vsnd.*/g, "$1"); //isolate filename
  
  //handle/pretty-print radio audio events
  logdata = logdata.replace(/\\radio_/g, "[RADIO] "); //
  logdata = logdata.replace(/male_number_station_([0-9]{1,2})_01/g, "$1"); //numbers
  logdata = logdata.replace(/male_number_station_([a-z])_01/g, "$1"); //letters
  logdata = logdata.replace(/male_number_station_and_([0-9]+)/g, "[&$1]");
  logdata = logdata.replace(/number_station_terminator_low_01_([0-9]+)/g, "[TL$1]");
  logdata = logdata.replace(/number_station_terminator_synthy_([0-9]+)/g, "[TS$1]");
  logdata = logdata.replace(/number_station_connector_low_01_([0-9]+)/g, "[CL$1]");
  prettyoutput.value = logdata.toUpperCase();
}
