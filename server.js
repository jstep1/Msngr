// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');

var PORT = process.env.PORT || 3001;
var app = express();


// Set the app up with morgan
app.use(logger("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Database configuration
var databaseUrl = process.env.MONGODB_URI || "mongodb://localhost/showflow";
var collections = ["flow", "users"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl , collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

  // Allow the api to be accessed by other apps

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });

/// BEGIN ROUTES


app.post('/sendmsg', function (req, res) {
    const Nightmare = require('nightmare')
    const nightmare = Nightmare({
        typeInterval: 10,
        show: true
    })

    nightmare
        .goto(`https://www.facebook.com/`)
        .type('#email', 'vector.cdo@gmail.com')
        .type('#pass', 'Pword1')
        .click('#loginbutton')
        .wait(3000)
        .type('._1frb', req.body.names)
        .wait('a._19bs')
        .click('a._19bs')
        .wait('div._2yer._401d._2xje._2nuh')
        .wait(3000)
        .click('a._2yet')
        .wait('#pagelet_timeline_profile_actions')
        .click('i.sx_0642ed')
        .wait(3000)
        .type('._1mf', 'Last test - checking to see if these all send at once')
        // .wait(3000)
        // .type('._1mf', '\u000d')
        .wait(3000)
        .end()
        .then(result => { res.json(result) })
        .catch(error => {
            console.error('Message send failed:', error)
        })

})

/// END ROUTES


// Default route
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Listen on port 3001
  app.listen(PORT, function() {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
  });