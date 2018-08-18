FactoryBot.define do
  factory :message do
    content Faker::Lorem.sentence
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, 'spec/factories/images/no_image.jpg')) }
    user
    group
  end
end