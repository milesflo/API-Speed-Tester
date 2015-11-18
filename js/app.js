//Function runs by itself & loads all of the searches
(function(){
  $(document).ready(function(){

    imdbConnect();
    googleBooksConnect();
    itunesConnect();

  })
})();

function imdbConnect(){
  $('#imdbButton').on("click", function(){
     $.ajax(imdb);
  });
};


function googleBooksConnect(){
  $('#googlebooksButton').on("click", function(){
     /* Uncomment for-loop to flood the server until refusal of service */
     // for (var i = 0; i < 1000; i++) {
       $.ajax(googleBooks);
      // }
  });
};


function itunesConnect(){
$('#itunesButton').on("click", function(){
  console.log(itunes);
    $.ajax(itunes);
  });
};


var API = function(name, type, url) {
  this.name = name;
  this.dataType = "jsonp";
  this.type = type;
  this.url = url;
  this.successfulHits = 0;
  this.failedHits = 0;
  var closureMe = this;
  this.success = function(data) {
    console.log('success!');
    closureMe.successfulHits++;
  };
  this.error = function(error) {
    console.log('failure!');
    closureMe.failedHits++;
  };
};


var itunes = new API('itunes', 'GET', 'https://itunes.apple.com/search?term=beatles');
var googleBooks = new API('google books', 'GET', 'https://www.googleapis.com/books/v1/volumes?q=intitle:The');
var imdb = new API('imdb', 'GET', 'http://www.omdbapi.com/?s=3');

console.log(itunes);

