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

module.exports.addPost = function (postData) {
  return new Promise((resolve, reject) => {
    if (postData.published == undefined) {
      postData.published = false;
    } else {
      postData.published = true;
    }
    postData.id = posts.length + 1;
    posts.push(postData);
    resolve(postData);
  });
};

module.exports.getPostsByCategory = function (category) {
  return new Promise((resolve, reject) => {
    let postsByCategoryArr = [];
    if (category < 1  || category > 5) {
      reject("Invalid category.");
    } else {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].category == category) {
          postsByCategoryArr.push(posts[i]);
        }
      }
      resolve(postsByCategoryArr);
    }
  });
};

module.exports.getPostsByMinDate = function (minDateStr) {
  return new Promise((resolve, reject) => {
    let postsByMinDateArr = [];
    for (let i = 0; i < posts.length; i++) {
      if(new Date(posts[i].postDate) >= new Date(minDateStr)){
        postsByMinDateArr.push(posts[i]);
       }
    }
    if (!postsByMinDateArr.length) {
      reject("No posts returned");
    } else {
      resolve(postsByMinDateArr);
    }
  });
};



module.exports.getPostById = function (id) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < posts.length; i++) {
      if (id == posts[i].id) {
        resolve(posts[i]);
      }
    }
  });
};
