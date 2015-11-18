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
$('#itunesButton').on("click", function(){
    $.ajax({
      dataType: "jsonp",
      type: "GET",
      url: "https://itunes.apple.com/search?term=beatles",
      success: function( data ) {
        console.log('success');
      },
      error: function( error ) {
        console.log('failure');
      }
    });
  });
}
