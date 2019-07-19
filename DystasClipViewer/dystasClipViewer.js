var auth_clientID = "uzcmdd9bowpmr2enfatj6uofl4mz3e"; //is public and may be shared (in sourcecode etc.)
var auth_redirect_uri = "https://dystakruul.github.io/DystasClipViewer/";

var api_base_url = "https://api.twitch.tv/helix/";
var api_endpoint_url_suffix__clips = "clips";

var auth_user_token; //read on initialize

//checks whether the site is on live servers or hosted locally (-> in active development)
var debug_enabled = location.host !== "dystakruul.github.io";
//may be used for disabling auto-redirects and API-requests etc.

var debug_last_api_response = {response: "empty"};
var debug_last_api_response_remaining_rate_limit = 0;

function initialize_dystasClipViewer(){
  auth_user_token = sessionStorage.getItem('auth_user_access_bearer_token');
  
  //load clips
  //build page
}