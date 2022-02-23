const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID =
  "1054181195103-crj8j9sp0p392c7bi3t6d63i5a8l91jl.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.serializeUser(function (user, done) {
  /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5050/google/callback",
      scope: "profile",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // use profile info to check if user is registered in db
      // if user exists get user from db and pass it to done as second argument to done
      // if not create a user with profile info and pass it as second argument to done

      return done(null, profile);
    }
  )
);
