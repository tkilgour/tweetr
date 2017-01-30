"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();
const methodOverride = require('method-override');


module.exports = function(DataHelpers) {

  tweetsRoutes.use(methodOverride('_method'));

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      likes: false,
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.put("/like-tweet", function(req, res) {
    DataHelpers.likeTweet(req.body.tweetID, req.body.likeStatus, (err) => {
      if (err) {
        res.status(500);
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
