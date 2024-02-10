//bpm i express
//npm i ejs

const express = require("express");
const app = express();
const bodyParser = require("body-parser");


//start the server
const PORT = process.env.PORT || 7004;


//#region MiddleWares
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/assets"));

const server = app.listen(PORT, ()=> {console.log("http://localhost:" +PORT)});
// set up the Socket.io
const io = require("socket.io")(server);


//#region REST API
app.get("/", (req, res) =>{
    res.render("mainClient.ejs") //doesn't work if i put an html file
})

io.on('connection', (socket) => {
    socket.on('chatMessage', (data) => {
        socket.broadcast.emit('message', data);
    })
    socket.on('disconnect', ()=> {
        console.log('User disconnected');
    });
});




