function build_page_from_clipdata(){
  if(!clipdata){return;}
  clear_clip_thumb_view();
  var clip_thumbs = document.getElementById('clip-thumbs');
  for(n = 0; n < Object.keys(clipdata).length; n++){
    for(m = 0; m < clipdata[Object.keys(clipdata)[n]].length; m++){
      clip_thumbs.appendChild(
        createClipThumbElement_fromClipdata(
          clipdata[Object.keys(clipdata)[n]][m],
          Object.keys(clipdata)[n], m
        )
      );
    }
  }
}

function debug_build_page_from_local_clipdata(){
  clear_clip_thumb_view();
  var clip_thumbs = document.getElementById('clip-thumbs');
  for(i = 0; i < debug_clipdata.data.length; i++){
    clip_thumbs.appendChild(
      createClipThumbElement_fromClipdata(debug_clipdata.data[i])
    );
  }
}

function createClipThumbElement_fromClipdata(cdata, broadcaster_id, clip_id){
  return createClipThumbElement(
    cdata.thumbnail_url,
    cdata.embed_url,
    cdata.title,
    cdata.created_at,
    cdata.view_count,
    broadcaster_id,
    clip_id
  );
}

function createClipThumbElement(clip_thumbnail_url, clip_embed_url, clip_title, clip_date, clip_views, clip_id){
  var clip_thumb_container = document.createElement('div');
  var clip_thumb_title_container = document.createElement('div');
  var clip_thumb_title = document.createElement('p');
  var clip_link = document.createElement('a');
  var clip_thumb = document.createElement('img');
  
  clip_thumb_container.className = "clip-thumb-container content-container";
  clip_thumb_title_container.className = "clip-thumb-title-container";
  clip_thumb_title.className = "clip-thumb-title";
  clip_thumb_title.innerHTML = clip_title;
  clip_link.href = clip_embed_url;
  clip_link.target = "clip-iframe";
  clip_thumb.className = "clip-thumb";
  clip_thumb.src = clip_thumbnail_url;
  
  clip_link.appendChild(clip_thumb);
  clip_thumb_title_container.appendChild(clip_thumb_title);
  clip_thumb_container.appendChild(clip_link);
  clip_thumb_container.appendChild(clip_thumb_title_container);
  clip_thumb_container.onclick = function(){clip_clicked(broadcaster_id, clip_id);};
  return clip_thumb_container;
}

function clip_clicked(broadcaster_id, clip_id){
  document.getElementById('clip-title').innerHTML = clipdata[broadcaster_id][clip_id].title;
  document.getElementById('clip-views').innerHTML = clipdata[broadcaster_id][clip_id].view_count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + " views";
  document.getElementById('clip-date').innerHTML = (new Date(clipdata[broadcaster_id][clip_id].created_at))
  .toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function clear_clip_thumb_view(){
  var clip_thumbs = document.getElementById('clip-thumbs');
  while(clip_thumbs.firstChild){
    clip_thumbs.removeChild(clip_thumbs.firstChild);
  }
}

function iframe_write(textToWrite){
  console.log("writing to iFrame: " + textToWrite);
  document.getElementById('clip-iframe').contentWindow.document.write("<p style='color:white;'>" + textToWrite + "</p>");
}
