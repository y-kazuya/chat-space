if @message.image.present?
    json.image  @message.image 
end
json.content  @message.content 
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_id  @message.user.id
json.user_name  @message.user.name
