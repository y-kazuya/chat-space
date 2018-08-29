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
						</div>`
	
	if (message.image.url == null){
		html = $(html).append(`</div>`)
	} else {
		html = $(html).append(`<div class = 'chatscreen__main__message-lists__message--image'><img src = '${message.image.url}'></div></div>`)
	}
	return html;
  };
	
	function scroolMessage(){
		var new_message = $('.chatscreen__main')[0];
		$(".chatscreen__main").animate({scrollTop: new_message.scrollHeight}, 'fast');
	};

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
			var html = buildHTML(data);
			$('.chatscreen__main__message-lists').append(html);
			$('#new_message')[0].reset();
			$(".chatscreen__footer__form--send").prop("disabled", false);
			scroolMessage();
		})
		
		.fail(function(){
			alert('error');
		});
  });
});
