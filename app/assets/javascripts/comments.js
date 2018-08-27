$(function(){
  function buildHTML(message){
		var html = `<div class="chatscreen__main__message-lists__message">
									<div class="chatscreen__main__message-lists__message--user">
										${message.user_name}
									</div>
									<div class="chatscreen__main__message-lists__message--date">
									  ${message.created_at} 
									</div>
									<div class="chatscreen__main__message-lists__message--text">
									  ${message.content}
									</div>
								</div>`
    return html;
  }
	
	function imageHTML(message){
		var html = `<div class="chatscreen__main__message-lists__message">
									<div class="chatscreen__main__message-lists__message--user">
										${message.user_name}
									</div>
									<div class="chatscreen__main__message-lists__message--date">
									  ${message.created_at} 
									</div>
									<div class="chatscreen__main__message-lists__message--text">
										<img class="lower-message__image" src="${message.image.url}" alt="tes">
										${message.content}
									</div>
								</div>`
    return html;
	}
	$("#new_message").on("submit", function(e){
	e.preventDefault();
	var formData = new FormData($(this)[0]);
	var url = $(this).attr("action");
	console.log(formData)
	$.ajax({
			url: url,
			type: "POST",
			data: formData,
			dataType: 'json',
			processData: false,
			contentType: false
			})
	.done(function(data){
	if (data.image == null){
		var html = buildHTML(data);}
	else{
		var html = imageHTML(data);
	}
	$('.chatscreen__main__message-lists').append(html)
	$('.chatscreen__footer__form--input').val('')
	$(".lower-message__image").val('')
	$(".chatscreen__footer__form--send").prop("disabled", false);
	$(".chatscreen__main").animate({scrollTop: $('.chatscreen__main')[0].scrollHeight}, 'fast');
	})
	
  .fail(function(){
		alert('error');
		
	})

  })
})
