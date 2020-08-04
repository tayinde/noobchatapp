# noobchat
## Overview
This is a chat application with a Node.js backend. It can be used live on [http://noobchatapp.herokuapp.com](http://noobchatapp.herokuapp.com)
## Purpose
This app is intended to be a minimal chat app that can be used briefly to chat with people. More features will be added as time moves on.
## Run on local machine
Running this on your local machine will be specific to the database you make it run on, meaning that your account will not be in the official database of the project.
<br>
To run this program, we will clone the repository and then enter its directory by doing this:
```sh
git clone https://github.com/tayinde/noobchat.git && cd noobchat
```
Now you will need to make a `.env`, though specifically do it with this command:
```sh
echo -e "DATABASE_KEY=mongodb://127.0.0.1:27017\nDB=ChatDB" > .env
```
Now open the .env file with any text editor you desire, and you should see a file that looks like this:
```
DATABASE_KEY=mongodb://127.0.0.1:27017
DB=ChatDB
```
If you want to change the database URI to your own database, you can do that, as the above URI serves only as a local database. If you do this, you can skip the following steps about making the local database to work.
***
Now you will need to install MongoDB, using the instructions for your operating system from this [link](https://docs.mongodb.com/manual/installation/). After installing MongoDB, you can use [this](https://zellwk.com/blog/local-mongodb/) tutorial to help run the MongoDB server.
***
After you have your Mongo server running, make sure you have [Node.js](https://nodejs.org/en/download/) installed, and type `npm start` in your parent directory. The app should be running on [http://localhost:8080](http://localhost:8080)



