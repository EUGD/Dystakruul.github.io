function TwitchAPIWebRequest(api_endpoint_url_suffix, api_query_parameters, callback_function){
  //'query_parameters' HAS to include '?' and '&'
  
  api_pending_requests++;
  
  var api_request_string = api_base_url + api_endpoint_url_suffix + api_query_parameters;
  var apiWebRequest = new XMLHttpRequest();
  apiWebRequest.open('GET', api_request_string);
  apiWebRequest.setRequestHeader("Client-ID", auth_clientID);
  apiWebRequest.setRequestHeader("Authorization", "Bearer " + auth_user_token);
  apiWebRequest.onreadystatechange = function(){
    if(apiWebRequest.readyState === 4){
      if(apiWebRequest.status === 200){
        console.log("requesting " + api_request_string);
        callback_function(JSON.parse(apiWebRequest.responseText));
        debug_last_api_response = apiWebRequest.response;
        api_pending_requests--;
        if(api_pending_requests <= 0){
          api_request_resolved_actions();
        }
      }else{
        console.log("[API_WEBREQUEST] (STATUS ERROR)");
        console.log("status: " + apiWebRequest.status + " (" + apiWebRequest.statusText + ")");
      }
    }
  };
  if(debug_enabled){console.log(apiWebRequest); return;}
  apiWebRequest.send();
}