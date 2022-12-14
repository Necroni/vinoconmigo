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
const mainRoutes = require("./routes/main-routes")
const wineRoutes = require("./routes/wine-routes")
const tastingRoutes = require("./routes/tasting-routes")

// Configs
require("dotenv").config({ path: "./config/.env" })
require("./config/passport-conf")(passport)

// Connect to database
connectDB()

// EJS and public folder
app.set("view engine", "ejs");
app.use(express.static("public"));

// Do I need body parsing? Still not sure
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logs
app.use(logger("dev"))

// methodOverride to allow puts/deletes
app.use(methodOverride("_method"))

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

// Add: Routes for main, wine, and tasting
app.use("/", mainRoutes)
app.use("/wine", wineRoutes)
app.use("/tasting", tastingRoutes)

// Server ready to ROCK?
app.listen(process.env.PORT, () => {
    console.log(`Server ready to ROCK on port ${process.env.PORT}`)
})