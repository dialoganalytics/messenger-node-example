'use strict';

require('dotenv').config();

var Dialog = require('dialog-api/lib/messenger');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var templateMessage = require('./payloads/template');
var textMessage = require('./payloads/text');
var quickRepliesMessage = require('./payloads/quick_replies');

var dialog = new Dialog(process.env.DIALOG_API_TOKEN, process.env.DIALOG_BOT_ID);

var app = express();

app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

var webHookPath = '/webhook/';

// Facebook verification
app.get(webHookPath, function(req, res) {
  if (req.query['hub.verify_token'] === process.env.FACEBOOK_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
    return;
  };

  res.send('Error: invalid validation token');
});

app.post(webHookPath, function(req, res) {
  var data = req.body;

  dialog.incoming(data);

  var messagingEvents = data.entry[0].messaging;

  if (messagingEvents.length && messagingEvents[0].message && messagingEvents[0].message.text) {
    var event = data.entry[0].messaging[0];

    if (event.message.is_echo) { return; };

    var message = null
    if (event.message.text.match(/template/)) {
      message = templateMessage;
    } else if (event.message.text.match(/quick replies/)) {
      message = quickRepliesMessage;
    } else {
      message = textMessage;
    };

    var payload = {
      recipient: {
        id: event.sender.id
      },
      message: message
    };

    var options = {
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.FACEBOOK_PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: payload
    };

    request(options, function(error, response, body) {
      dialog.outgoing(payload, body);
    })
  };

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
