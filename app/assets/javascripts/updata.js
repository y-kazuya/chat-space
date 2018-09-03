$(function(){
  var message_list = $(".chatscreen__main__message-lists");
    
  function appendmessage(message){
    var html = `<div class="chatscreen__main__message-lists__message" data-id="${message.id}">
      <div class="chatscreen__main__message-lists__message--user">
        ${message.name}
      </div>
      <div class="chatscreen__main__message-lists__message--date">
        ${message.date}
      </div>
      <div class="chatscreen__main__message-lists__message--text">
        ${message.content}
      </div>`
      
    if (message.image.url == null){
      html = $(html).append(`</div>`);
    }
    else {
      html = $(html).append(`<div class = 'chatscreen__main__message-lists__message--image'><img src = '${message.image.url}'></div></div>`);
    }

    message_list.append(html);
  }
  
  function scroolMessage(){
    var new_message = $('.chatscreen__main')[0];
    $(".chatscreen__main").animate({scrollTop: new_message.scrollHeight}, 'fast');
  };
  
  var interval = setInterval(function(){
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        dataType: 'json',
      })
      .done(function(messages){
        var now_count = $(".chatscreen__main__message-lists__message").length 
        var messages_count = messages.length  
        if (messages_count !== now_count) {
          var change = messages_count - now_count
          var new_messages = (messages.slice(messages_count - change , messages_count))
          new_messages.forEach(function(message){
            appendmessage(message);
          });
          scroolMessage();
        }
        else {
        }
      })
      .fail(function() {
        alert('自動更新に失敗しましたよ');
      });
    }
    else{
      clearInterval(interval);
    }
  },5000);
})
