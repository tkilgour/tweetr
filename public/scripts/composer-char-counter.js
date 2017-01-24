$(document).ready(function() {
  $('.new-tweet form textarea').on('keyup', function() {
    let $charLength = $(this).val().length;
    let charsLeft = 140 - $charLength;
    const $counter = $(this).siblings('.counter')
    $counter.text(charsLeft);
    if (charsLeft < 0) {
      $counter.css("color", "red");
    } else {
      $counter.css("color", "inherit");
    }
  });
});