const express = require("express"); // require expressjs
const bodyparser = require("body-parser"); // bodyparser
const path = require("path"); // and path

// then require our praytimes libary
const praytimes = require("./lib/praytimes.js");

// init app
var app = express();


function calc(query, lat, lng, timezone) {
    // init class
    var times = new praytimes();
    var methods = times.getMethods();

    // set default configuration
    var config = methods["MWL"];

    // get date
    var date = new Date();

    // select method (params)
    if (typeof methods[query.method] === "object") {
        config = methods[query.method].params;
    } else {
        // override method
        query.method = "MWL";
    }

    // parse date if needed
    if (query.date) {
        var parsed = Date.parse(query.date);

        if (isNaN(query.date) && !isNaN(parsed)) {
            date = new Date(parsed);
        }
    }


    // set config
    times.adjust(config);

    // get times
    var pt = times.getTimes(date, [lat, lng], timezone);

    return {
        method: query.method,
        date: date,
        pt: pt
    };
}

// set view engine to pug
app.set("view engine", "pug");

// use static path
app.use(express.static(path.join(__dirname + "/public/")));

// use middleware
app.use(bodyparser.urlencoded({ extended: true }));

// set headers and log request
app.use((req, res, next) => {
    // set headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // force https
    if (req.headers['x-forwarded-proto'] != 'https' && process.env["FORCEHTTPS"]) {
        res.redirect(302, 'https://' + req.hostname + req.originalUrl);
    }
    // and continue
    next();
});

// index page
app.get("/", (req, res) => {
    // get varibles from url query
    var lat = req.query.lat;
    var lng = req.query.lng;
    var timezone = req.query.timezone;
    
    // check if they're numbers
    if (isNaN(lat) || isNaN(lng) || isNaN(timezone)) {
        // latitude and longitude are not numbers (or timezone)
        // if not set status code to 500
        status_code = 500;
    }

    // else convert them into numbers
    lat = Number(lat);
    lng = Number(lng);
    timezone = Number(timezone);

    var {method, date, pt} = calc(req.query, lat, lng, timezone);

    res.render("index", pt);

});


// api requests
app.get("/api/:lat/:lng/:timezone", (req, res) => {
    // set status code
    var status_code = 200;

    // get varibles from url string
    var lat = req.params.lat;
    var lng = req.params.lng;
    var timezone = req.params.timezone;
    
    // check if they're numbers
    if (isNaN(lat) || isNaN(lng) || isNaN(timezone)) {
        // latitude and longitude are not numbers (or timezone)
        // if not set status code to 500
        status_code = 500;
    }
    
    // else convert them into numbers
    lat = Number(lat);
    lng = Number(lng);
    timezone = Number(timezone);
    
    // calculate times
    var {method, date, pt} = calc(req.query, lat, lng, timezone);

    // check if the times were calculated correctly
    if (pt.imsak === "-----") {
        status_code = 500;
    }

    // send response object
    res.status(status_code).send({
        date: date.toString(),
        status: status_code,
        timezone: timezone,
        method: method,
        coordinates: {
            latitude: lat,
            longitude: lng
        },
        times: pt
    });
});

var port = process.env.PORT || 80;

app.listen(port, () => {
    console.log("Listening on port", port);
});