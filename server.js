var express = require('express');
var app = express();
const fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

//enable cors
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.get('/germanyannual', function (req, res) {
    //read all annual csv files
    var rain_10mm_days = fs.readFileSync("csv/rain_10mm_days_forecast.csv", 'utf8');
    var rain_20mm_days = fs.readFileSync("csv/rain_20mm_days_forecast.csv", 'utf8');
    var hot_days = fs.readFileSync("csv/hot_days_forecast.csv", 'utf8');
    var summer_days = fs.readFileSync("csv/summer_days_forecast.csv", 'utf8');
    var frost_days = fs.readFileSync("csv/frost_days_forecast.csv", 'utf8');
    var ice_days = fs.readFileSync("csv/ice_days_forecast.csv", 'utf8');
    // concatenate all csv files to one string
    var messsage_string = rain_10mm_days + "|" + rain_20mm_days + "|" + hot_days + "|" + summer_days + "|" + frost_days + "|" + ice_days;
    //send the message string
    res.send(messsage_string);
});

app.get('/germanymonthly', function (req, res) {
    //read all monthly csv files
    var air_temperature_mean = fs.readFileSync("csv/air_temperature_mean_forecast.csv", 'utf8');
    var precipitation = fs.readFileSync("csv/precipitation_forecast.csv", 'utf8');
    var sunshine_duration = fs.readFileSync("csv/sunshine_duration_forecast.csv", 'utf8');
    // concatenate all csv files to one string
    var messsage_string = air_temperature_mean + "|" + precipitation + "|" + sunshine_duration;
    //send the message string
    res.send(messsage_string);
});

app.get('/europe', function (req, res) {
    //read all needed csv files
    var europeCities = readFiles("csv/europe/");
    //send the message string
    res.send(europeCities);
});

app.listen(3000, function () {
    console.log('VintDef listening on port 3000');
});

function readFiles(dirname) {
    var filenames = fs.readdirSync(dirname);
    filenames.sort();
    var europeCities = "";
    for (var i = 0; i < filenames.length; i++) {
        if (i === 0) {
            europeCities += fs.readFileSync(dirname + filenames[i], 'utf-8');
        }
        else {
            europeCities += "|" + fs.readFileSync(dirname + filenames[i], 'utf-8');
        }
    }
    return europeCities;
}