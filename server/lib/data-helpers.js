"use strict";
const ObjectId = require('mongodb').ObjectId;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().sort({"created_at":1}).toArray(callback);
    },

    // Like a tweet in `db`
    likeTweet: function(tweetID, likeStatus, callback) {
      db.collection("tweets").update({
        _id: ObjectId(tweetID)
      }, {
        $set: {"likes":likeStatus}
      });
      callback(null, true);
    }

  };
}
