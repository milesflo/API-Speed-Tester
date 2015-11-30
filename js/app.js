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

		$.ajax(apiObj.url, {
			success: function(data) {
				apiObj.delayTimesCollection.push(new Date().getTime() - callbackTime);
				apiObj.successfulHits++;
				logging(apiObj);
			},
			error: function(error) {
				console.log('failure!');
				apiObj.failedHits++;
				logging(apiObj);
			},
			cache: false
		});

		apiObj.averageDelayTime = calculateAverage(apiObj);
		
		/* IMPLEMENT THE STUFF HERE OVER THE WEEKEND*/
		
	};
};

function logging (apiObj) {
	if (apiObj.metaname === "imdb") {
			$('#imdbAvgTime').html(apiObj.averageDelayTime);
			$('#imdbSuccessCount').html(imdb.successfulHits);
			$('#imdbFailedCount').html(apiObj.failedHits);
			$('#imdbSuccessRate').html(apiObj.successfulHits / apiObj.failedHits + "%");
			// Rate limiting message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== 100) {
				$('#imdbRateLimitBool').html("Some");
			}  else if (apiObj.failedHits === 100) {
				$('#imdbRateLimitBool').html("You've been banned from this server.");
			} else {
				$('#imdbRateLimitBool').html("No")
			}

		}  else if (apiObj.metaname === "googleBooks") {
			$('#googleBooksAvgTime').html(apiObj.averageDelayTime);
			$('#googleBooksSuccessCount').html(apiObj.successfulHits);
			$('#googleBooksFailedCount').html(apiObj.failedHits);
			$('#googleBooksSuccessRate').html(apiObj.successfulHits / apiObj.failedHits + "%");
			// Rate limiting message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== 100) {
				$('#googleBooksRateLimitBool').html("Some");
			}  else if (apiObj.failedHits === 100) {
				$('#googleBooksRateLimitBool').html("You've been banned from this server.");
			} else {
				$('#googleBooksRateLimitBool').html("No")
			}
		}  else if (apiObj.metaname === "itunes") {
			$('#itunesAvgTime').html(apiObj.averageDelayTime);
			$('#itunesSuccessCount').html(apiObj.successfulHits);
			$('#itunesFailedCount').html(apiObj.failedHits);
			$('#itunesSuccessRate').html(apiObj.successfulHits / apiObj.failedHits + "%");
			// Rate limit message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== 100) {
				$('#itunesRateLimitBool').html("Some");
			}  else if (apiObj.failedHits === 100) {
				$('#itunesRateLimitBool').html("You've been banned from this server.");
			} else {
				$('#itunesRateLimitBool').html("No")
			}
		}
}

var calculateAverage = function(apiObj) {
	var sum = 0;
	for (var i = 0; i < apiObj.delayTimesCollection.length; i++) {
		sum += apiObj.delayTimesCollection[i];
	};
	return ((sum/apiObj.delayTimesCollection.length).toFixed(2));
};

//IMDB AJAX. Connected to a button.
function imdbConnect(){
	$('#imdbButton').on("click", function(){
		imdb.delayTimesCollection = [];
		imdb.successfulHits = 0;
		imdb.failedHits = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(generateCallback(i, imdb), 5 * i);
		};
	});
};

//Google books AJAX. Connected to a button
function googleBooksConnect(){
	$('#googlebooksButton').on("click", function(){
		googleBooks.delayTimesCollection = [];
		googleBooks.successfulHits = 0;
		googleBooks.failedHits = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(generateCallback(i, googleBooks), 5 * i);
		};
		console.log("hi");
	});
};

//Itunes AJAX. Connected to button
function itunesConnect(){
	$('#itunesButton').on("click", function(){
		itunes.delayTimesCollection = [];
		itunes.successfulHits = 0;
		itunes.failedHits = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(generateCallback(i, itunes), 5 * i);
		};
	});
};

/*Creator class for new API's. includes name for 
ease, request type, and url (destination)*/
var API = function(metaname, name, type, url) {
	var closureMe = this;
	this.metaname = metaname;
	this.name = name;
	this.ajaxStartTime = {};
	this.dataType = "jsonp";
	this.type = type;
	this.url = url;
	this.successfulHits = 0;
	this.failedHits = 0;
	this.delayTimesCollection = [];
};

//Creation of API's using constructor.
var itunes = new API('itunes', 'iTunes', 'GET', 'https://itunes.apple.com/search?term=division');
var googleBooks = new API('googleBooks', 'Google Books', 'GET', 'https://www.googleapis.com/books/v1/volumes?q=intitle:The');
var imdb = new API('imdb', 'iMDB', 'GET', 'http://www.omdbapi.com/?s=3');


