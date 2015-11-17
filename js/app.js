//Function runs by itself & loads all of the searchs
(function(){
  $(document).ready(function(){

    imdbSearch();
    googleBooksSearch();
    itunes();

  })
})();

function imdbSearch(){
  $('#imdbButton').on("click", function(){
     $.ajax({
        url: "http://www.omdbapi.com/?s=3",
        success: function( data ) {
          console.log('success');
        },
        error: function( error ) {
           console.log('failure');
         }
      });
  })
}


function googleBooksSearch(){
  $('#googlebooksButton').on("click", function(){
     // for (var i = 0; i < 1000; i++) {
       $.ajax({
          url: "https://www.googleapis.com/books/v1/volumes?q=intitle:The",
          success: function( data ) {
            console.log('success');
          },
          error: function( error ) {
             console.log('failure');
          }
        });
      // }
  });
}


function itunes(){

  var userInput, searchUrl, results;
  var outputArea = $("div#itunes .results");

  $('#itunesButton').on("click", function(){
     userInput = $('#itunesInput').val();
     searchUrl = "https://itunes.apple.com/search?term=" + userInput

     //clear the output field
     outputArea.html('');

      $.ajax({
          type: "GET",
          dataType:"jsonp",
          url: searchUrl
      }).done(function (data) {
          results = data.results;
          results.forEach(function(item){
            outputArea.append("<li>" + item.artistName + " - " + item.trackName + " <a href='" + item.previewUrl + "'>Preview Song</a></li>")
          })
      });
  });
}
