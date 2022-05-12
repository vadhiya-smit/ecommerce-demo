const express = require("express")
const httpStatus = require("http-status")
const passport = require("passport")
const morgalMiddleware = require("./config/morgan")
const { createApiError, errorHandler } = require("./middleware/error")
const { jwtStretegy, googleStretegy } = require("./middleware/passport")
const allV1Route = require("./routes/v1")
const ApiError = require("./utils/ApiError")
const session = require('express-session')

const app = express()

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true ,
}))


app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(morgalMiddleware)

// app.use((req, res, next) => {
//     console.log(req.headers['x-forwarded-proto'])
//     if (req.headers['x-forwarded-proto'] !== 'https'){
//         console.log(true);
//         // the statement for performing our redirection
//         return res.redirect('https://' + req.headers.host + req.url);}
//     else
//         return next();
// });


app.use(passport.initialize())
app.use(passport.session())    

passport.use("jwt", jwtStretegy)
passport.use("google", googleStretegy)

passport.serializeUser((user, cb) => {
    cb(null, user)
})
passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

app.get(
    "/",
    passport.authenticate("google", { scope: ["email", "profile"] }), (req, res) => {
        console.log(req)
        res.send("hello")
    });
    app.get("/callback"
    ,
    (req,res)=>{
     //console.log(req.isAuthenticated())
       return res.send("Congrats");
});

//Define the Login Route
app.get("/login", (req, res) => {
    res.render("login.ejs")
})


//Use the req.isAuthenticated() function to check if user is Authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}

//Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", {name: req.user.displayName})
})

app.use("/v1", allV1Route)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Api url path not found"))
})

app.use(createApiError)

app.use(errorHandler)

module.exports = app