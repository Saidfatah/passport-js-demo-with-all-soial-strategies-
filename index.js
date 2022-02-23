const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./passport.config");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "tutorial-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/failed", (req, res) => res.send("failed to authenticate!"));
app.get("/logged", isLoggedIn, (req, res) =>
  res.send(
    "<img with='100' height='100'    src=" + req.user.photos[0].value + " />"
  )
);
app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/logged");
  }
);

app.listen(5050, () => console.log(`Example app listening on port 5050!`));
