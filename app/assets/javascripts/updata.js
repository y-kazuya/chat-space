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
      
    message.image.url == null ? html = $(html).append(`</div>`) : html = $(html).append(`<div class = 'chatscreen__main__message-lists__message--image'><img src = '${message.image.url}'></div></div>`)
    message_list.append(html);
    scroolMessage();
  }
  
  function scroolMessage(){
    var new_message = $('.chatscreen__main')[0];
    $(".chatscreen__main").animate({scrollTop: new_message.scrollHeight}, 'fast');
  };
  
  var interval = setInterval(function(){
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      var count = $(".chatscreen__main__message-lists__message").length

      $.ajax({
        url: location.href,
        type: "GET",
        data: {count: count},
        dataType: 'json',
      })
      .done(function(messages){
        messages.forEach(function(message){
          appendmessage(message);
        });
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
