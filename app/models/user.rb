class User < ApplicationRecord
  has_many :app_users, class_name: "User", foreign_key: "admin_user_id"
  belongs_to :admin_user, class_name: "User", optional: true

  has_secure_password :validations => false

  before_save {email.downcase!}

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }

  validates_presence_of :first_name, length: {maximum: 50}
  validates_presence_of :last_name, length: {maximum: 50}

  validate :password_match
 
  def password_match
    if password.present?
      if !@password_confirmation.present?
        errors.add(:password_confirmation, "missing")
      elsif password != @password_confirmation
        errors.add(:password_confirmation, "mismatch")
      end
    else
      if role == 'admin'
        errors.add(:password, "is required")
      end
    end
  end

  def is_admin?
    role == 'admin'
  end

  private

  def before_create_callback
    binding.pry
  end
end
