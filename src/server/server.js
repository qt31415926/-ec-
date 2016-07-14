"use strict"
import express from 'express';
import path from 'path';
import socketIo from 'socket.io';
import http from 'http';
import chalk from 'chalk';


const app = express();
const httpServer = http.Server(app);
const io = socketIo(httpServer);
const port = process.env.PORT || 8081;
const htmlFile = path.resolve(__dirname, "..", "dist", "index.html");

//TO:DO FIX PATH RESOLVES
app.use(express.static(path.resolve(__dirname,"..","dist")));

app.get('/', function(req, res){
  res.sendFile(htmlFile);
})

io.on("connection", function(socket){
  console.log(chalk.blue("User connected:"), chalk.green(socket.id));
})

app.listen(port);
console.log("Running on http://localhost:"+port);
