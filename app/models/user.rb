class User < ApplicationRecord
  has_many :app_users, class_name: "User", foreign_key: "admin_user_id"
  belongs_to :admin_user, class_name: "User", optional: true
end
