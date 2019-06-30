
// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");
var exphbs = require("express-handlebars");
const bodyParser = require("body-parser")
const cheerio = require("cheerio");
const axios = require("axios");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const db = require("./models");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;



// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sets view engine to Handlebars

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ================================================================================
// DATABASE
// Sets up Storage using Mongo
// ================================================================================


// Use mongojs to hook the database to the db constiable

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongolab-asymmetrical-23114";
mongoose.connect(MONGODB_URI);

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from constious URLs.
// ================================================================================

// Import routes and give the server access to them.
app.use(express.static("./public"));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

module.exports = app;

// Static directory


// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================


  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
