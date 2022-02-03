/*********************************************************************************
 * WEB322 – Assignment 02
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
 * of this assignment has been copied manually or electronically from any other source
 * (including 3rd party web sites) or distributed to other students.
 *
 * Name: Victor Margheriti
 * Student ID: 153097209
 * Date: 2020-02-03
 *
 * Online (Heroku) Link:
 *
 ********************************************************************************/
const express = require("express");
const path = require("path");
const blog = require("./blog-service.js");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.redirect("/about")
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"))
});

app.get("/blog", (req, res) => {
    // here
});



app.listen(HTTP_PORT, function(){
    console.log(`Express http server listening on ${HTTP_PORT}`);
});

