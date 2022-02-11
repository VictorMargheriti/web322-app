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
const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const upload = multer(); // no { storage: storage } 
const blogDataService = require("./blog-service.js");
const app = express();

cloudinary.config({
  cloud_name: 'dfknzgo2m',
  api_key: '421913683339951',
  api_secret: '3hhtHIxES2TMuu3iIRIFUzBM3Sg',
  secure: true
 });

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/about");
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/blog", (req, res) => {
  blogDataService
    .getPublishedPosts()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("Message: " + err);
    });
});

app.get("/posts", (req, res) => {
  blogDataService
    .getAllPosts()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("Message: " + err);
    });
});

app.get("/categories", (req, res) => {
  blogDataService
    .getCategories()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("Message: " + err);
    });
});

app.get("/posts/add", (req, res)=>{
  res.sendFile(path.join(__dirname, "views/addPost.html"))
});

app.post("/posts/add", upload.single("featureImage"), (req, res) => {
  if(req.file){
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result);
        return result;
    }

    upload(req).then((uploaded)=>{
        processPost(uploaded.url);
    });
}else{
    processPost("");
}

function processPost(imageUrl){
    req.body.featureImage = imageUrl;
    res.send(`
        <h1>${req.body.title}</h1><br />
        <img src="${imageUrl}" /><br />
        <p>${req.body.body}</p>
    `);
    res.redirect("views/posts");
} 
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

blogDataService
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Express http server listening on ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



  