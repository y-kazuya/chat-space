# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

##usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null :false, unique: true|
|mail|string|null :false, unique: true|


### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

##groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null :false, unique: true|


### Association
- has_many :members
- has_many :users, through: :members
- has_many :messages


##messageテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|text|text|null: false|
|img|string|

### Association
- belongs_to :user
- belongs_to :group

