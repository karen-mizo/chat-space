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

* # chat_space データベース設計
* ## userテーブル
  |colum|type|option|
  |----|----|----|
  |name|string|null: false|
  |email|string|null: false, unique: true|
  |password|string|null: false|
  
    ### Association
   - has_many :groups, through:  :members
   - has_many :members
   - has_many :messages

* ## groupテーブル
  |colum|type|option|
  |----|----|----|
  |name|string|null: false|
  
   ### Association
   - has_many :users, through:  :members
   - has_many :members
   - has_many :messages


* ## messageテーブル
  |colum|type|option|
  |----|----|----|
  |body|text||  
  |image|string||
  |user_id|integer|null: false, foreign_key: true|
  |group_id|integer|null: false, foreign_key: true|
  
  ### Association
   - belongs_to :user
   - belongs_to :group



* ## memberテーブル
  |colum|type|option|
  |----|----|----|
  |user_id|integer|null: false, foreign_key: true|
  |group_id|integer|null: false, foreign_key: true|

  ### Association
  - belongs_to :user
  - belongs_to :group
