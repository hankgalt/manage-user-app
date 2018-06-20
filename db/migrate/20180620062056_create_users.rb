class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password_digest
      t.string :role, default: "user", null: false
      t.datetime :last_login
      t.integer :admin_user_id

      t.timestamps
    end
    add_index :users, :email
    add_index :users, :admin_user_id
  end
end
