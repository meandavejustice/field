var Corsify = require("corsify");
var sendJSON = require('send-data/json');
var sendHTML = require('send-data/html');
var http = require("http");
var st = require("st");
var Router = require('http-hash-router');
var router = Router();

var baseTmp = require('./templates/base');
var sampleListTmp = require('./templates/sample-list');

var map = require('./embed/map');

var app = Router();

var data = [{
  "id": "uniqid",
  "title": "Disney Dolphin Pool Room",
  "detail_url": "string",
  "audio_url": "https://s3-us-west-2.amazonaws.com/fieldrecordings/Disney+Dolphin+Pool+Room.m4a",
  "coordinates": {
    "lat": 28.366369,
    "lon": -81.559238
  },
  "description": "This was recorded in the Pool Room bathroom",
  "author": "meandave",
  "contact": "davejustishh@gmail.com",
  "length": "3.049",
  "created": new Date().toUTCString(),
  "license": "cc",
  "tags": ["disney", "ambient", "hell"],
  "img_url": "https://sdfkasl"
  /* "wave_url": "https://sdfkasl",
     "wave_img": "https://sdfkasl.png" */
}]

var cors = Corsify({
  "Access-Control-Allow-Origin": "http://localhost:9966"
});

router.set("/embed/map", map);

router.set("/api/recordings", cors(function(req, res, opts) {
  sendJSON(req, res, data);
}));

router.set("/", function(req, res, opts) {
  sendHTML(req, res, baseTmp(sampleListTmp(data)).outerHTML);
});

router.set("*", st({
  path: __dirname +"/public",
  cache: false
}));

http.createServer(function handler(req, res) {
  router(req, res, {}, onError);

  function onError(err) {
    if (err) {
      // use your own custom error serialization.
      res.statusCode = err.statusCode || 500;
      res.end(err.message);
    }
  }
}).listen(8000);

console.log("hello world server listening on port 8000")
