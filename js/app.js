//Function runs by itself on page load.
(function(){
  $(document).ready(function(){

    imdbConnect();
    googleBooksConnect();
    itunesConnect();

  })
})();

//IMDB AJAX. Connected to a button.
function imdbConnect(){
  $('#imdbButton').on("click", function(){
     $.ajax(imdb);
  });
};

//Google books AJAX. Connected to a button
function googleBooksConnect(){
  $('#googlebooksButton').on("click", function(){
    $.ajax(googleBooks);
  });
};

//Itunes AJAX. Connected to button
function itunesConnect(){
  $('#itunesButton').on("click", function(){
    $.ajax(itunes);
  });
};

/*Creator class for new API's. includes name for 
ease, request type, and url (destination)*/
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

//Creation of API's using constructor.
var itunes = new API('iTunes', 'GET', 'https://itunes.apple.com/search?term=beatles');
var googleBooks = new API('Google Books', 'GET', 'https://www.googleapis.com/books/v1/volumes?q=intitle:The');
var imdb = new API('iMDB', 'GET', 'http://www.omdbapi.com/?s=3');

//Log iTunes object at page load
console.log(itunes);

