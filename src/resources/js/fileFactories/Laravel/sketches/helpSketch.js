export default 
`// use PascalCase for models
Garage
location
capacity

// Separate your entities into chunks
Car
color
user_id // foreign key

// use snake_case model1_model2 to setup a ManyToMany relationship
car_garage 

// to add a default user system, use the '+ user system' button
User 
name
email
email_verified_at
password
remember_token

// use snake_case to create a table
password_resets
email
token`