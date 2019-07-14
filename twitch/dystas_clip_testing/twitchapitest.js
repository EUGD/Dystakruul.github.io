var auth_clientID = "l8e8n9rxsl0mssc72raxnwri07h4kw"; //is public and can be shared (in sourcecode etc.)
var auth_redirect_uri = "https://dystakruul.github.io/twitch/dystas_clip_testing/";
var auth_api_base_url = "https://id.twitch.tv/oauth2/authorize";
var auth_response_type = "token";
var auth_scopes = ""; //currently no need for additional scopes

var api_base_url = "https://api.twitch.tv/helix/";
var api_suffix_clips = "clips";
var api_suffix_streams = "streams";
var api_suffix_vods = "videos";

function initialize(){
  authorize_client();
}

function authorize_client(){
  console.log(get_auth_request_string());
}

function get_auth_request_string(){
  var req =  auth_api_base_url;
  req += "?client_id=" + auth_clientID;
  req += "&redirect_uri=" + auth_redirect_uri;
  req += "&response_type=" + auth_response_type;
  req += "&scope=" + auth_scopes;
}