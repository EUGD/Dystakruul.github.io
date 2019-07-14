var auth_clientID = "l8e8n9rxsl0mssc72raxnwri07h4kw"; //is public and can be shared (in sourcecode etc.)
var auth_redirect_uri = "https://dystakruul.github.io/twitch/dystas_clip_testing/";
var auth_api_base_url = "https://id.twitch.tv/oauth2/authorize";
var auth_response_type = "token";
var auth_scopes = ""; //currently no need for additional scopes

var api_base_url = "https://api.twitch.tv/helix/";
var api_suffix_clips = "clips";
var api_suffix_streams = "streams";
var api_suffix_vods = "videos";

var auth_client_token = "";

var last_response = {response: "empty"};

//my id: 37711496

function initialize(){
  if(document.location.hash !== "" && document.location.hash.split('=')[0] === "#access_token"){
    auth_client_token = document.location.hash.split('&')[0].split('=')[1];
    getClipData();
  }else{
    authorize_client();
  }
}

function authorize_client(){
  document.getElementById('auth-href').href = get_auth_request_string();
  document.getElementById('auth-href').style.display = "";
  location = get_auth_request_string();
}

function get_auth_request_string(){
  var req =  auth_api_base_url;
  req += "?client_id=" + auth_clientID;
  req += "&redirect_uri=" + auth_redirect_uri;
  req += "&response_type=" + auth_response_type;
  req += "&scope=" + auth_scopes;
  return req;
}

function getClipData(){
  if(auth_client_token !== ""){
    var uxhr = new XMLHttpRequest();
    uxhr.open('GET', api_base_url + "users/follows?from_id=37711496");
    uxhr.setRequestHeader("Authorization", "Bearer " + auth_client_token);
    uxhr.setRequestHeader("Client-ID", auth_clientID);
    uxhr.onreadystatechange = function(){
      if(uxhr.readyState === 4){
        if(uxhr.status === 200){
          console.log("remaining ratelimit:");
          console.log(uxhr.getResponseHeader('ratelimit-remaining'));
          last_response = uxhr;
          console.log(JSON.parse(uxhr.responseText));
          formatClipRequest(JSON.parse(uxhr.responseText));
        }else{
          console.log("error.");
          console.log("status: " + uxhr.status);
          console.log("response: " + uxhr.response);
        }
      }
    }
    uxhr.send();
  }
}

function formatClipRequest(json){
  var streamerIDs = "";
  var streamerNames = [""];
  for(i=0;i<json.data.length;i++){
    streamerIDs += (i ? "" : "&") + json.data[i].to_id;
    streamerNames[i] = json.data.to_name;
  }
  console.log("ID REQWUeSTS START");
  console.log(streamerIDs);
  console.log("ID ResWuAWDTST END");
  getClips(streamerIDs);
}

function getClips(streamerIDs){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "https://api.twitch.tv/helix/clips?broadcaster_id=195166073");
  xhr.setRequestHeader("Client-ID", auth_clientID);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        last_response = xhr;
        console.log(JSON.parse(xhr.responseText));
      }else{
        console.log("error.");
        console.log("status: " + xhr.status);
        console.log("response: " + xhr.response);
      }
    }
  }
  xhr.send();
}
