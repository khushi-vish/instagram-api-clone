const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require("uuid");

// set view engine for ejs
app.set("view engine", "ejs");

// setting path for path folder
app.set("views", path.join(__dirname, "/views"));

// adding path for public folder
app.use(express.static(path.join(__dirname, "public")));

// to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// LOGIC=======================================================
let userProfiles = [
  {
    picUrl: "/assets/facebook.png",
    username: "facebook",

    followers: 200,
    following: 29,
    description:
      "we believe people can do more together than alone we believe people can do more together than alone we believe people can do more together than alone we believe people can do more together than alone",
    posts: [
      {
        id: uuidv4(),
        imgUrl: "https://random.imagecdn.app/500/150",
        likes: 300,
        comment: 300,
        caption:
          "i am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin it",
      },
      {
        id: uuidv4(),
        imgUrl: "https://random.imagecdn.app/500/150",
        likes: 300,
        comment: 300,
        caption:
          "i am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin it",
      },
      {
        id: uuidv4(),
        imgUrl: "https://random.imagecdn.app/500/150",
        likes: 300,
        comment: 300,
        caption:
          "i am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin it",
      },
      {
        id: uuidv4(),
        imgUrl: "https://random.imagecdn.app/500/150",
        likes: 300,
        comment: 300,
        caption:
          "i am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin iti am lovin it",
      },
    ],
  },
];

// ROUTES=======================================================
app.get("/", (req, res) => {
  res.render("home.ejs", { userProfiles });
});

app.post("/", (req, res) => {
  let { picUrl, username, followers, following, description } = req.body;
  let posts = [];
  let post = {
    picUrl,
    username,
    followers,
    following,
    description,
    posts,
  };
  userProfiles.push(post);
  res.redirect("/");
});

app.get("/new", (req, res) => {
  res.render("newprofile.ejs");
});

app.get("/:username", (req, res) => {
  let { username } = req.params;
  // console.log(username);
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username ${username} not found`);
    return res.status(404).send("user not found");
  }
  let posts = user.posts;
  // console.log(`user.posts : ${user.posts}`);
  res.render("profile.ejs", { user, posts });
});

app.get("/:username/new", (req, res) => {
  let { username } = req.params;
  res.render("newpost.ejs", { username });
});

app.post("/:username", (req, res) => {
  let { username } = req.params;
  let { imgUrl, likes, comment, caption } = req.body;
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username ${username} not found`);
    return res.status(404).send("user not found");
  }
  let posts = user.posts;
  let id = uuidv4();
  posts.push({ id, imgUrl, likes, comment, caption });
  res.redirect(`/${username}`);
});

// profile patch website
app.get("/:username/edit", (req, res) => {
  let { username } = req.params;
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username ${username} not found`);
    return res.status(404).send("user not found");
  }
  res.render("editprofile.ejs", { username, user });
});

app.patch("/:username", (req, res) => {
  // picUrl, followers, following, description
  let newlink = req.body.picUrl;
  let newfollowers = req.body.followers;
  let newfollowing = req.body.following;
  let newdescription = req.body.description;

  let { username, id } = req.params;
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username ${username} not found`);
    return res.status(404).send("user not found");
  }

  user.picUrl = newlink;
  user.followers = newfollowers;
  user.following = newfollowing;
  user.description = newdescription;

  res.redirect(`/${username}`);
});

app.delete("/:username", (req, res) => {
  let { username } = req.params;
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username : ${username} not found`);
    return res.status(404).send("user not found");
  }
  userProfiles = userProfiles.filter((user) => user.username !== username);
  res.redirect(`/`);
});

app.get("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username ${username} not found`);
    return res.status(404).send("user not found");
  }
  let posts = user.posts;
  let post = posts.find((p) => p.id == id);
  res.render("post.ejs", { user, post, username });
});

app.get("/:username/:id/edit", (req, res) => {
  let { username, id } = req.params;
  let user = userProfiles.find((profile) => profile.username === username);
  let posts = user.posts;
  let post = posts.find((p) => p.id == id);
  res.render("editpost", { user, post });
});

app.patch("/:username/:id", (req, res) => {
  // imgUrl, likes, comment, caption
  let newlink = req.body.imgUrl;
  let newlikes = req.body.likes;
  let newcomment = req.body.comment;
  let newcaption = req.body.caption;

  let { username, id } = req.params;
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username ${username} not found`);
    return res.status(404).send("user not found");
  }
  let posts = user.posts;
  let post = posts.find((p) => p.id == id);

  post.imgUrl = newlink;
  post.likes = newlikes;
  post.comment = newcomment;
  post.caption = newcaption;

  res.redirect(`/${username}/${id}`);
});

app.delete("/:username/:id", (req, res) => {
  let { username, id } = req.params;
  let user = userProfiles.find((user) => user.username === username);
  if (!user) {
    console.error(`user with username : ${username} not found`);
    return res.status(404).send("user not found");
  }
  // let posts = user.posts;
  // console.log(`before removing : ${JSON.stringify(posts)}`);
  user.posts = user.posts.filter((p) => p.id !== id);
  // console.log(`after removing : ${JSON.stringify(posts)}`);
  res.redirect(`/${username}`);
});

// QUICK POSTS/PROFILES==============================================

// SERVER START=====================================================
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
