/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('.tweet').hover(function() {
    $(".tweet .hover-icons").css("visibility", "visible");
    $(".tweet").css("border-color", "#888");
    $(".tweet .avatar").css("filter", "saturate(100%)")
  }, function() {
    $(".tweet .hover-icons").css("visibility", "hidden");
    $(".tweet").css("border-color", "#ddd");
    $(".tweet .avatar").css("filter", "saturate(70%)");
  });
});