$(document).ready(function () {

  var reactions = ["anger", "love", "happy", "cute", "cuddle", "annoyed", "irritated", "hug", "kiss", "sad"];


  //creates buttons from items in reactions array
  function createButtons() {
    reaction = $("#button-space").val("");
    $("#button-space").empty();

    for (var i = 0; i < reactions.length; i++) {
      var gifButton = $("<button>");
      gifButton.addClass("buttons btn btn-standard");
      gifButton.attr("data-name", reactions[i]);
      gifButton.text(reactions[i]);
      $('#button-space').append(gifButton);
    }
  }

  //settings for submit button, prevents page reload on submit click
  //adds new topics to reactions array to be rendered into new buttons on page
  $("#add-subject").on("click", function (event) {
    event.preventDefault();
    var newButton = $("#search-term").val().trim();
    reactions.push(newButton);
    createButtons();
  });


  function displayGifs() {
    //inputs search term into query url to get specific gifs
    var reaction = $(this).data("name");
    var APIKey = "s3ZDUTZMiKXdgbfp7sj2bUGFqMfXTpUS";

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + reaction + "&limit=15&offset=0&lang=en";

    //ajax call for json object
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      console.log(response);
      // empty gif div from previous call
      $("#gif-view").empty();

      for (var i = 0; i < response.data.length; i++) {
        //gives attributes for variables for image, gif, and rating
        var animatedGif = $("<img/>").attr("src", response.data[i].images.fixed_height_still.url);
        var rating = $("<p>").text(response.data[i].rating);
        $("#gif-view").append(animatedGif, rating);
      }
    })
    console.log(queryURL);
  }

  //pause thos mofos
  $(".gif").on("click", function () {


    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");

    }
  })


  //function call

  $(document).on("click", ".buttons", displayGifs);


  createButtons();
})