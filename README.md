Sample of REST application

REST application that provides REST API.

Run MessageService locally

Database configuration

1. Create database massages //will create automatically by mongoDB 

Change mongoose connection settings in index.js according to below description 

datasource url = mongodb+srv://<user>:<password>@cluster0.fcaim.mongodb.net/<dbname>?retryWrites=true&w=majority 
Predefined dbname - <dbname> //need to use your mongoDB profile settings
Predefined username - <user> //need to use your mongoDB profile settings
Predefined password - <password> //need to use your mongoDB profile settings


2. git clone https://github.com/SamsonEmelyanov/message-avgRating
3. cd message-avgRating

4. Access MessageService using next REST requests:

GET: localhost:3000/message/ - get all messages
GET: localhost:3000/message/61326b35251eef06ddb949b9 - get message with ID 61326b35251eef06ddb949b9
GET: localhost:3000/message/61326b35251eef06ddb949b9/ratings - get message's array of ratings with ID 61326b35251eef06ddb949b9

POST: localhost:3000/message/ - post the message
Request body:
{
    "payload":{
	"text": "Hello,World!",
	}
}
Restrictions: 
- Request body cannot be empty(payload and text is required);
- You cannot post the message with rating inside payload body


PUT: localhost:3000/message/61326b35251eef06ddb949b9 - edit the message with ID 61326b35251eef06ddb949b9
Request body:
{
    "payload":{
   	"text": "Hello,everybody in the World!",
   	}
}
Restrictions: 
- You cannot update already posted message's ratings

PUT: localhost:3000/message/61326b35251eef06ddb949b9/ratings - add to array of massage's ratings the value in request body and
return  the average message's raiting with ID 61326b35251eef06ddb949b9
Request body:
{
    "payload":{
   	"ratings": 10,
   	}
}
Restrictions: 
- Posted rating must be between 1 and 10 score

DELETE: localhost:3000/message/61326b35251eef06ddb949b9 - delete customer with ID 61326b35251eef06ddb949b9
