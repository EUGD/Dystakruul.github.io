var auth_clientID = "uzcmdd9bowpmr2enfatj6uofl4mz3e"; //is public and may be shared (in sourcecode etc.)
var auth_api_base_url = "https://id.twitch.tv/oauth2/authorize";
var auth_redirect_uri = "https://dystakruul.github.io/DystasClipViewer/";
var auth_response_type = "token";
var auth_scopes = ""; //no need for additional scopes

var debug_enabled = window.location.host !== "dystakruul.github.io";
if(debug_enabled){
  window.onload = function(){initialize_dystasClipViewer()};
}

function dystasClipViewer_AuthenticationCheck(){
  iframe_write("auth"); //DEBUG
  if(document.location.hash !== "" && document.location.hash.split('=')[0] === "#access_token"){
    var auth_user_access_bearer_token = document.location.hash.split('&')[0].split('=')[1];
    sessionStorage.setItem('auth_user_access_bearer_token', auth_user_access_bearer_token);
    if(debug_enabled){return;}
    window.location.hash = ""; //nur zur sicherheit, falls etwas mit dem redirect schiefläuft; damit kein endloses reloaden/auth requesten passiert
    window.location.href = "https://dystakruul.github.io/DystasClipViewer/";
    //is the redirect really neccessary? does it impact the UX?
    //maybe only remove text after hash (can't get rid of the hash sign itself with out reload though)
  }else{
    if(sessionStorage.getItem('auth_user_access_bearer_token')){
      if(typeof api_base_url !== 'undefined'){ //this will have been set if body has loaded
        initialize_dystasClipViewer();
      }else{
        window.onload = function(){
          initialize_dystasClipViewer();
        }
      }
    }else{
      request_authentication();
    }
  }
  iframe_write("auth end"); //DEBUG
}

function request_authentication(){
  var auth_request_url = "";
  auth_request_url += auth_api_base_url;
  auth_request_url += "?client_id=" + auth_clientID;
  auth_request_url += "&redirect_uri=" + auth_redirect_uri;
  auth_request_url += "&response_type=" + auth_response_type;
  auth_request_url += "&scope=" + auth_scopes;
  
  if(debug_enabled){return;}
  window.location.href = auth_request_url;
}