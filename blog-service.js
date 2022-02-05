const fs = require("fs");
let posts = [];
let categories = [];

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/posts.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        posts = JSON.parse(data);
      }
    });

    fs.readFile("./data/categories.json", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        categories = JSON.parse(data);
      }
    });
    resolve();
  });
};

module.exports.getAllPosts = function () {
  return new Promise((resolve, reject) => {
    if (posts.length == 0) {
      reject("No results returned");
    } else {
      resolve(posts);
    }
  });
};

module.exports.getPublishedPosts = function () {
  return new Promise((resolve, reject) => {
    let publishedPosts = [];
    if (posts.length == 0) {
      reject("No results returned.");
    } else {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].published == true) {
          publishedPosts.push(posts[i]);
        }
      }
      resolve(publishedPosts);
    }
  });
};

module.exports.getCategories = function () {
  return new Promise((resolve, reject) => {
    if (categories.length == 0) {
      reject("No results returned.");
    } else {
      resolve(categories);
    }
  });
};
