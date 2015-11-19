//Function runs by itself on page load.
(function(){
  $(document).ready(function(){

    imdbConnect();
    googleBooksConnect();
    itunesConnect();

  })
})();


function generateCallback(iteration, apiObj) {
    return function(){
        var callbackTime = new Date().getTime();
        $.ajax(apiObj.url, {success: function(data) {
            console.log(callbackTime);
            apiObj.delayTimesCollection.push(new Date().getTime() - callbackTime);
            apiObj.successfulHits++;
          }
          error: function(error) {
            console.log('failure!');
            closureMe.failedHits++;
          } 
        });

        //console.log(apiObj); // unchanged
        //console.log(iteration);
      }
    
}

//IMDB AJAX. Connected to a button.
function imdbConnect(){
  $('#imdbButton').on("click", function(){
    for (var i = 0; i < 100; i++) {
      setTimeout(generateCallback(i, imdb), 5 * i);
    };
  });
};

//Google books AJAX. Connected to a button
function googleBooksConnect(){
  $('#googlebooksButton').on("click", function(){
    for (var i = 0; i < 100; i++) {
      setTimeout(generateCallback(i, googleBooks), 5 * i);
    };
  });
};

//Itunes AJAX. Connected to button
function itunesConnect(){
  $('#itunesButton').on("click", function(){
    for (var i = 0; i < 100; i++) {
      setTimeout(generateCallback(i, itunes), 5 * i);
    };
  });
};

/*Creator class for new API's. includes name for 
ease, request type, and url (destination)*/
var API = function(name, type, url) {
  this.name = name;
  this.ajaxStartTime = {};
  this.dataType = "jsonp";
  this.type = type;
  this.url = url;
  this.successfulHits = 0;
  this.failedHits = 0;
  var closureMe = this;
  this.delayTimesCollection = [];
};

//Creation of API's using constructor.
var itunes = new API('iTunes', 'GET', 'https://itunes.apple.com/search?term=beatles');
var googleBooks = new API('Google Books', 'GET', 'https://www.googleapis.com/books/v1/volumes?q=intitle:The');
var imdb = new API('iMDB', 'GET', 'http://www.omdbapi.com/?s=3');

//Log iTunes object at page load
console.log(itunes); 

