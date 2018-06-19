class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.references :admin_user
      
      t.string :first_name
      t.text :last_name
      t.string :user_name
      t.text :password
      t.text :other_info

      t.timestamps
    end
  end
end
