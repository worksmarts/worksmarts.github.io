// If document is completely loaded
$(document).ready(function () {
  // Attach click event handler to button
  $(".cmpbtn").click(function (event) {
    // Prevent default action
    event.preventDefault();

    // Show the overlay checker
    $('.overlay-checker').show();

    // Hide the button
    $('.answer').hide();
    $('.button').hide();

    window.location = window.campaignUrl
  });
});
