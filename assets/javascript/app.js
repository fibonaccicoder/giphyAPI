$(document).ready(function () {

var reactions = ["anger", "love", "happy", "cute", "cuddle", "annoyed", "irritated", "hug", "kiss", "sad"];
var APIKey = "s3ZDUTZMiKXdgbfp7sj2bUGFqMfXTpUS";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey +"&q=" + reaction +"&limit=25&offset=0&rating=G&lang=en";


//creates buttons from items in reactions array
 function createButtons(){
     for(var i =0; i < reactions.length; i++){
      var gifButton = $("<button>");
      gifButton.addClass("buttons");
      gifButton.attr("data-name", reactions[i]);
      gifButton.text(reactions[i]);
      $('#gif-view').append(gifButton);
    }

 //settings for submit button, prevents page reload on submit click
 //adds new topics to reactions array to be rendered into new buttons on page
    $("#add-subject").on("click", function(event) {
    event.preventDefault();
    var newButton = $("#text-input").val().trim();
    reactions.push(newButton);
    createButtons();
    });


function displayGifs(){
  //inputs search term into query url to get specific gifs
  var reaction = $(this).data("name");
//ajax call for json object
	 $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);
//empty gif div from previous call
      $("#gif-view").empty();
//
      var stillImg = (response.data[i].images.downsized_still.url);
      var animatedGif = $("<img>").attr("src", imageURL);
      var rating = (response.data[i].rating);

    })
}

//pause thos mofos
  $(".gif").on("click", function() {
      
      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
}
})

//function call
createButtons();
displayGifs();




//dynamically create buttons
//create buttons when added to search box
//pull up specific api info when each specific button is clicked
//push new search to topics array to be displayed when clicked on 
//pause gifs until clicked on 
//pull up gifs, use parameters q, limit and rating