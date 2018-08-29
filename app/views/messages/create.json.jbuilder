json.image  @message.image 
json.content  @message.content 
json.created_at  @message.created_at.to_s(:datetime)
json.user_id  @message.user.id
json.user_name  @message.user.name
