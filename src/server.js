var express = require('express');
var cors = require('cors');
var request = require('superagent');
var cheerio = require('cheerio');
var scrapers = require('./scrapers.js');

var PORT = 4041;

var app = express();

app.use(cors());
app.use(express.static('public'));

app.get('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/', function (req, res) {
  // res.send(JSON.stringify({ hei: 'du'}));
  res.render('index.html');
});


app.get('/stripe', function (req, res) {
  request
    .get('https://status.stripe.com')
    .end(function (serr, sres) {
      if (serr) {
        res.send(JSON.stringify({
          success: false,
          error: serr.message
        }));
      } else {
        parsed = scrapers.parseStripeStatusPage(sres.text);
        res.send(JSON.stringify(parsed));
      }
    });
});

app.get('/intercom', function (req, res) {
  request
    .get('https://status.intercom.com')
    .end(function (serr, sres) {
      res.send(JSON.stringify({ data: sres }));
    });
});

var server = app.listen(PORT, function () {
    console.log("Listening on port %s...", server.address().port);
});
