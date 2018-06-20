# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

admin_user = User.create(first_name:"john", last_name:"tolkien", email:"john@test.com", password:"tolkien", role:'admin', password_confirmation: "tolkien")
User.create(admin_user: admin_user, first_name:"frodo", last_name:"baggins", email:"frodo@test.com", password:"baggins", password_confirmation: "baggins")
User.create(admin_user: admin_user, first_name:"bilbo", last_name:"baggins", email:"bilbo@test.com", password:"baggins", password_confirmation: "baggins")
User.create(admin_user: admin_user, first_name:"gandalf", last_name:"the grey", email:"gandalf@test.com", password:"grey", password_confirmation: "grey")
