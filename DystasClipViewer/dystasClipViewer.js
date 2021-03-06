var auth_clientID = "uzcmdd9bowpmr2enfatj6uofl4mz3e"; //is public and may be shared (in sourcecode etc.)
var auth_redirect_uri = "https://dystakruul.github.io/DystasClipViewer/";
var auth_user_token; //read on initialize

var api_base_url = "https://api.twitch.tv/helix/";
var api_endpoint_url_suffix__clips = "clips";

var api_pending_requests = 0;
var api_request_resolved_actions;

var clipdata; //loaded after auth success / on init
var followedChannels; //loaded on init

//checks whether the site is on live servers or hosted locally (-> in active development)
//may be used for disabling auto-redirects and API-requests etc.
var debug_enabled = location.host !== "dystakruul.github.io";
var debug_last_api_response = {response: "empty"};
var debug_page_built = false;
var debug_clips_loaded = false;

function initialize_dystasClipViewer(){
  auth_user_token = sessionStorage.getItem('auth_user_access_bearer_token');
  followedChannels = JSON.parse(localStorage.getItem('dystasClipViewer_followedChannels'));
  api_request_resolved_actions = function(){};
  loadClips();
}

function loadClips(){
  /*
    TODO:
    calculate clip rating etc. when loading clips,
    then write it to clipdata
    
  */
  
  if(!followedChannels){console.log("failed loading followed channels"); return;}
  var broadcasterId = "0";
  var num_of_clips = 20;
  var end_date = new Date();
  var timespan_days = 7;
  var start_date = new Date(end_date.getTime() - (timespan_days * 24 * 60 * 60 * 1000));
  var start_date_ISO_String = start_date.toISOString();
  var end_date_ISO_String = end_date.toISOString();
  
  if(api_request_resolved_actions.toString().length <= 12){
    api_request_resolved_actions = function(){
      build_page_from_clipdata();
    }
  }else{
    console.log("api_request_resolved_actions is already set!");
  }
  
  for(k = 0; k < Object.keys(followedChannels).length; k++){
    TwitchAPIWebRequest(
      api_endpoint_url_suffix__clips,
      "?broadcaster_id=" + Object.keys(followedChannels)[k] +
      "&started_at=" + start_date_ISO_String +
      "&ended_at=" + end_date_ISO_String +
      "&first=" + num_of_clips,
      function(jsondata){
        console.log(jsondata);
        !jsondata.data?function(){console.log("empty response")}:null;
        !clipdata&&(clipdata={});
        clipdata[jsondata.data[0].broadcaster_id] = jsondata.data;
      }
    );
  }
}

function getClipRating(clip_creation_date, clip_views){
  var clip_age = getDaysSince(clip_creation_date);
  return (((clip_views * ((-Math.tanh((2*clip_age/3)-4)+1)/2)))/1000);
}

function getDaysSince(date_string){
  return ((new Date().getTime() - new Date(date_string).getTime()) / (24 * 60 * 60 * 1000));
}