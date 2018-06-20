class User < ApplicationRecord
  has_many :app_users, class_name: "User", foreign_key: "admin_user_id"
  belongs_to :admin_user, class_name: "User", optional: true

  has_secure_password

  before_validation { 
    (self.email = self.email.to_s.downcase) 
  }

  validates_presence_of     :email
  validates_uniqueness_of   :email

  # validates_presence_of :admin_user, :unless => :role == 'admin'

  def is_admin?
    role == 'admin'
  end
end
