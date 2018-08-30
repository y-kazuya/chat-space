$(function(){
  var search_list = $("#user-search-result");
    
  function appenduser(user) {
    var html = `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
			</div>`
			
    search_list.append(html);
  }

  function appendNouser(user) {
    var html = `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user}</p>
			</div>`
			
    search_list.append(html);
  }
      
	function buildHtml(user_name, user_id){
		var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
				<input name='group[user_ids][]' type='hidden' value="${user_id}">
				<p class='chat-group-user__name'>${user_name}</p>
				<a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
			</div>`
		
		return html;
	}
  
	$("#user-search-field").on("keyup", function(){
		var text_field = $("#user-search-field");
		var input = text_field.val();
		$.ajax({
			type: "GET",
			url: "/users",
			data: {keyword: input},
			dataType: 'json',
		})
		.done(function(users){
			$("#user-search-result").empty();
			if (users.length !== 0) {
				users.forEach(function(user){
					appenduser(user);
				});
			}
			else {
				appendNouser("一致する人物はいません");
			}
			$(".user-search-add").on("click", function(){
				var element = $(this)[0];
				var user_name = $(element).attr("data-user-name");
				var user_id = $(element).attr("data-user-id");
				$(this).parent().remove();
				var html = buildHtml(user_name, user_id);
				$("#chat-group-users").append(html);
				$(".user-search-remove").on("click", function(){
					$(this).parent().remove();
				});
			});
		})

		.fail(function() {
			alert("ユーザー検索に失敗しました");
		});
	});
});