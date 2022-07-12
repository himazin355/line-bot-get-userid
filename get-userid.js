let CHANNEL_ACCESS_TOKEN = "YOUR ACCESS TOKEN";
function doPost(e) {
  let contents = e.postData.contents;
  let obj = JSON.parse(contents)
  let events = obj["events"];
  for(let i = 0; i < events.length; i++){
    if(events[i].type == "message"){
      reply_message(events[i]);
    }
  }
}

function reply_message(e) {
  let user_id = e.source.userId;
  let group_id = e.source.groupId;
  let room_id = e.source.roomId;
  let ids = `user_id:${user_id}\n group_id:${group_id}\n room_id:${room_id}`;
  let postData = {
    "replyToken" : e.replyToken,
    "messages" : [
      {
        "type" : "text",
        "text" : ids
      }
    ]
  };
  let options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(postData)
  };
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
