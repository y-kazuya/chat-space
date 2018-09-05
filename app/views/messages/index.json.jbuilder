json.array! @messages do |message|
  json.id          message.id
  json.name        message.user.name
  json.date        message.created_at.to_s(:datetime)
  json.content     message.content
  json.image       message.image
end
