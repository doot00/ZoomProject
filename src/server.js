import express from 'express';
import WebSocket from 'ws';
import http from "http";

const app=express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});


const sockets = [];

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res)=>res.render("home"));
app.get("/*", (req, res)=>res.redirect("/"));

const handleListen= () =>console.log("Listening on http://localhost:3000");

wss.on("connection", (socket)=>{
    sockets.push(socket);
    console.log("Connected to Browser");

    socket.on("close", ()=>{
        console.log("Disconnected from Browser")
    });
    socket.on("message", (msg)=>{
        const message = JSON.parse(msg);
        console.log(message.type, message.payload);
        sockets.forEach(aSocket => aSocket.send(`${message}`));
    });


})

server.listen(3000, handleListen);


