const express = require("express")
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")    
const session = require("express-session")  
const MongoStore = require("connect-mongo")
const methodOverride = require("method-override")   // Will need this for form/buttons later
const flash = require("express-flash")  // will need this later for alerts
const logger = require("morgan")
const connectDB = require("./config/database-conf")  // Mongo is set up - should connect without issues
//const mainRoutes = require("./routes/main")     // Routes not set up yet
//const postRoutes = require("./routes/posts")    // Routes not set up yet

// Configs
require("dotenv").config({ path: "./config/.env" })
require("./config/passport-conf")(passport)

connectDB()

// Add:
// EJS
// static public folder

// Do I need body parsing? Still not sure
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logs
app.use(logger("dev"))

// Add: methodOverride

// Sessions stored in Mongo
app.use(
    session({
        secret: "elemental frogger",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ 
            mongoUrl: process.env.DB_STRING
         }),
    })
)

// Add passport initialization and session
app.use(passport.initialize())
app.use(passport.session())

// Flash messages
app.use(flash())

// Add: Routes for main and post

// Server ready to ROCK?
app.listen(process.env.PORT, () => {
    console.log(`Server ready to ROCK on port ${process.env.PORT}`)
})