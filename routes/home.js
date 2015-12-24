var sendHTML = require('send-data/html');
var auth = require('../lib/auth');
var baseTmp = require('../templates/base');
var formTmps = require('../templates/');

module.exports = function(req, res, opts) {
  sendHTML(req, res, baseTmp(sample-list(data)).outerHTML);
}
