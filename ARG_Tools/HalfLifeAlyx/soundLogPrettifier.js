var loginput;
var prettyoutput;

function init(){
  loginput = document.querySelector("#input");
  prettyoutput = document.querySelector("#output");
}

function prettify(){
  let logdata = loginput.value;
  //remove sound system info, filepaths and file extensions from two different log output formattings
  logdata = logdata.replace(/\[\s\s\sSoundSystem\s\]\:\s\s\(\s1b\)\s+[0-9]+\s\:\ssounds\\ambient\\radio\\radio_(.*)\.vsnd/g, "$1"); //isolate file name v1
  logdata = logdata.replace(/\[\s\s\sSoundSystem\s\]\:\s\[\(cl\)\s[0-9]+\]\ssounds\\ambient\\radio\\radio_(.*)\.vsnd\s\:\ssrc\s\-1\s\:\schannel\s6\s\:\svol\s1\.00\s\:\stime\s([0-9]+\.[0-9]+)/g, "$1"); //isolate file name v2
  logdata = logdata.replace(/male_number_station_([0-9]{1,2})_01/g, "$1"); //isolate numbers
  logdata = logdata.replace(/male_number_station_([a-z])_01/g, "$1"); //isolate letters
  logdata = logdata.replace(/number_station_terminator_low_01_([0-9]+)/g, "TL$1");
  logdata = logdata.replace(/number_station_terminator_synthy_([0-9]+)/g, "TS$1");
  logdata = logdata.replace(/number_station_connector_low_01_([0-9]+)/g, "CL$1");
  logdata = logdata.replace(/male_number_station_and_([0-9]+)/, "&$1");
  prettyoutput.value = logdata;
}
