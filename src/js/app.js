"use strict";

const PORT = process.env.port || 3000;

var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var http = require("http");
var path = require("path");
var fs = require("fs");
var multer = require("multer");
var app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));
app.use(multer({ dest: "./tmp/"}).single("file"));
app.use(express.static("public"));

app.get("/public", function(req, res) {
	console.log(__dirname);
	var indexPath = path.join(__dirname, "index.html");
	console.log(indexPath);
	res.sendFile(indexPath);
});

var server = http.createServer(app);

server.listen(PORT).on("error", function(err){
		console.error(err);
	}).on("listening", function(){
		console.log(`You\'re now listening to ${PORT}, smooth jazz`)
	});
