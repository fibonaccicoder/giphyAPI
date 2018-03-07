$(document).ready(function() {

var reactions = ["anger", "love", "happy", "cute", "cuddle", "annoyed", "irritated", "hug", "kiss", "sad"];
var APIKey = "s3ZDUTZMiKXdgbfp7sj2bUGFqMfXTpUS";
var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + reaction + "&lang=en&api_key=" + APIKey + "&limit=15";


//creates buttons from items in reactions array
 function createButtons(){
     for(var i =0; i < reactions.length; i++){
      var gifButton = $("<button>");
      gifButton.addClass("buttons btn btn-standard");
      gifButton.attr("data-name", reaction);
      gifButton.text(reactions[i]);
      $('#button-space').append(gifButton);
    }

 //settings for submit button, prevents page reload on submit click
 //adds new topics to reactions array to be rendered into new buttons on page
    $("#add-subject").on("click", function(event) {
    event.preventDefault();
    var newButton = $("#search-term").val().trim();
    reactions.push(newButton);
    $("#search-term").val(" ");
    createButtons();
    });


function displayGifs(){
  //inputs search term into query url to get specific gifs
  var reaction = $(this).val("#search-term");
//ajax call for json object
	 $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);
//empty gif div from previous call
      $("#gif-view").empty();
//gives attributes for variables for image, gif, and rating
      var animatedGif = $("<img>").attr("src", response.data[i].images.fixed_height.url);
      var rating = $("<p>").text(response.data[i].rating);
//appends items to gif-view div
      $("#gif-view").append(animatedGif, rating);
    })
}

//may or many not pause gifs when clicked on lol
  $('.img').on("click", function(){
        var src = $(this).attr('src')
        if(src.includes('_s.gif')){
          $(this).attr('src', src.replace('_s.gif','.gif'));
           }
        else{
          $(this).attr('src', src.replace('.gif','_s.gif'));
         }
       })
     };
  }

//function call

 $(document).on("click", ".buttons", displayGifs);
    createButtons();

}

//dynamically create buttons
//create buttons when added to search box
//pull up unique api according to the data attributes when each specific button is clicked
//push new search to topics array to be displayed when clicked on 
//pause gifs until clicked on 
//pull up gifs, use parameters q, limit and rating