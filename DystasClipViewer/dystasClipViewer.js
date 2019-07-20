var auth_clientID = "uzcmdd9bowpmr2enfatj6uofl4mz3e"; //is public and may be shared (in sourcecode etc.)
var auth_redirect_uri = "https://dystakruul.github.io/DystasClipViewer/";
var auth_user_token; //read on initialize

var api_base_url = "https://api.twitch.tv/helix/";
var api_endpoint_url_suffix__clips = "clips";

var clipdata; //loaded after auth success / on init
var followedChannels; //loaded on init

//checks whether the site is on live servers or hosted locally (-> in active development)
//may be used for disabling auto-redirects and API-requests etc.
var debug_enabled = location.host !== "dystakruul.github.io";
var debug_last_api_response = {response: "empty"};
var debug_last_api_response_remaining_rate_limit = 0;

function initialize_dystasClipViewer(){
  auth_user_token = sessionStorage.getItem('auth_user_access_bearer_token');
  followedChannels = localStorage.getItem('dystasClipViewer_followedChannels');
  debug_enabled?debug_build_page_from_local_clipdata():loadClips();
}

function loadClips(){
  if(!followedChannels){iframe_write("failed loading followed channels"); return;}
  var broadcasterId = "0";
  var num_of_clips = 5;
  var start_date = new Date();
  var timespan_days = 7;
  var end_date = new Date(start_date.getTime() + (timespan_days * 24 * 60 * 60 * 1000));
  var start_date_ISO_String = start_date.toISOString();
  var end_date_ISO_String = end_date.getISOString();
  
  for(k = 0; k < Objeckt.keys(followedChannels).length; k++){
    TwitchAPIWebRequest(
      api_endpoint_url_suffix__clips,
      "?broadcaster_id=" + Object.keys(followedChannels)[k] +
      "&started_at=" + start_date_ISO_String +
      "&ended_at=" + end_date_ISO_String +
      "&first=" + num_of_clips,
      function(jsondata){
        clipdata[Object.keys(followedChannels)[k]] = jsondata.data;
        //clipdata[jsondata.data[0].broadcaster_id] = jsondata.data;
      }
    );
  }
}