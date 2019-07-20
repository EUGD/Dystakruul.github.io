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
var debug_page_built = false;
var debug_clips_loaded = false;

function initialize_dystasClipViewer(){ console.log("init");
  auth_user_token = sessionStorage.getItem('auth_user_access_bearer_token');
  followedChannels = JSON.parse(localStorage.getItem('dystasClipViewer_followedChannels'));
  loadClips();
  build_page_from_clipdata();
}

function loadClips(){ console.log("load clips");
  if(!followedChannels){console.log("failed loading followed channels"); return;}
  var broadcasterId = "0";
  var num_of_clips = 5;
  var end_date = new Date();
  var timespan_days = 7;
  var start_date = new Date(end_date.getTime() - (timespan_days * 24 * 60 * 60 * 1000));
  var start_date_ISO_String = start_date.toISOString();
  var end_date_ISO_String = end_date.toISOString();
  
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
        if(debug_page_built){build_page_from_clipdata();}
      }
    );
  }
  if(debug_page_built){build_page_from_clipdata();}
}

function getClipRating(clip_creation_date, clip_views){
  var clip_age = getDaysSince(clip_creation_date);
  return (clip_views * ((-Math.tanh((2*clip_age/3)-4)+1)/2));
}

function getDaysSince(date_string){
  return (Math.round((
    (new Date().getTime() - new Date(date_string).getTime()) / (24 * 60 * 60 * 1000)
  ) * 100) / 100);
}