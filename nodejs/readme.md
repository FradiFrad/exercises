# Exercise 1

## 1. Setup

- Make a docker-compose that launches a node script displaying "hello world".
- Add a SQL DB
- Use the nodemon package and the Docker volumes system to watch the file and re-launch the script when it is updated.

## 2. DB config

Use knex package and the migrations system to create a user table with username and password field (string). Create the rollback to come back to the DB initial state

## 3. Express server

- Port 8080 of node container must be accessible from the host
- Use express to return "hello world" when there is a GET on /

## 4: Objection !

- Create an Objection model for the user
- Setup Knex to get along with Objection

## 5: Signup

- Create a /signup route
- It receives an object :
  {
  username: string,
  password: string
  } where password length 6 char min
- it saves a user in the DB after hashing the password with bcrypt and return the user without the password
