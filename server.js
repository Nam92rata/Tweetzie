const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
var Twitter = require('twitter');
const port = process.env.PORT || 4001;
const index = require("./src/routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
global.searchQuery='#india';
io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );  
  socket.on("ToAPI",(data)=>{
    console.log("Received ",data);
    global.searchQuery = data;
  });
  socket.on("disconnect", () => console.log("Client disconnected"));  
});

var client = new Twitter({
  //Insert your keys here
  consumer_key:'',
  consumer_secret:'',
  access_token_key:'',
  access_token_secret:''  
});

const getApiAndEmit = async socket => {
  try {     
    const res = client.get('search/tweets', {q: global.searchQuery, lang: 'en', count:2}, function(error, tweets, response) {
      if(error) {
        console.log(error);
        throw error;  }
      tweets.statuses.map((tweet)=>{
        // console.log(tweet);
        socket.emit("FromAPI", tweet);        
      })
          
      // return response;
   }
   );
    console.log(res);
    // socket.emit("FromAPI", res);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
 
};
server.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = getApiAndEmit;