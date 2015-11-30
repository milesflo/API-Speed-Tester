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
				apiObj.failedHits++;
				logging(apiObj);
			},
			cache: false
		});

		apiObj.averageDelayTime = calculateAverage(apiObj);
		
	};
};

function logging (apiObj) {
	if (apiObj.metaname === "imdb") {
			if (apiObj.averageDelayTime === NaN) {
				$('#imdbAvgTime').html("None");
			}  else {
				$('#imdbAvgTime').html(apiObj.averageDelayTime);
			}
			$('#imdbSuccessCount').html(imdb.successfulHits);
			$('#imdbFailedCount').html(apiObj.failedHits);
			$('#imdbSuccessRate').html(((apiObj.successfulHits / 100)*100).toFixed(0) + "%");
			// Rate limiting message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== 100) {
				$('#imdbRateLimitBool').html("Some");
			}  else if (apiObj.failedHits === 100) {
				$('#imdbRateLimitBool').html("You've been banned");
			} else {
				$('#imdbRateLimitBool').html("None")
			}

		}  else if (apiObj.metaname === "googleBooks") {
			if (apiObj.averageDelayTime === NaN) {
				$('#googleBooksAvgTime').html("None");
			}  else {
				$('#googleBooksAvgTime').html(apiObj.averageDelayTime);
			}
			$('#googleBooksSuccessCount').html(apiObj.successfulHits);
			$('#googleBooksFailedCount').html(apiObj.failedHits);
			$('#googleBooksSuccessRate').html(((apiObj.successfulHits / 100)*100).toFixed(0) + "%");
			// Rate limiting message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== 100) {
				$('#googleBooksRateLimitBool').html("Some");
			}  else if (apiObj.failedHits === 100) {
				$('#googleBooksRateLimitBool').html("You've been banned");
			} else {
				$('#googleBooksRateLimitBool').html("None")
			}
		}  else if (apiObj.metaname === "itunes") {
			if (apiObj.averageDelayTime === NaN) {
				$('#itunesAvgTime').html("None");
			}  else {
				$('#itunesAvgTime').html(apiObj.averageDelayTime);
			}
			$('#itunesSuccessCount').html(apiObj.successfulHits);
			$('#itunesFailedCount').html(apiObj.failedHits);
			$('#itunesSuccessRate').html(((apiObj.successfulHits / 100)*100).toFixed(0) + "%");
			// Rate limit message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== 100) {
				$('#itunesRateLimitBool').html("Some");
			}  else if (apiObj.failedHits === 100) {
				$('#itunesRateLimitBool').html("You've been banned");
			} else {
				$('#itunesRateLimitBool').html("None")
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
		$('#imdbData').css('visibility','visible');
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
		$('#googleBooksData').css('visibility','visible');
		googleBooks.delayTimesCollection = [];
		googleBooks.successfulHits = 0;
		googleBooks.failedHits = 0;
		for (var i = 0; i < 100; i++) {
			setTimeout(generateCallback(i, googleBooks), 5 * i);
		};
	});
};

//Itunes AJAX. Connected to button
function itunesConnect(){
	$('#itunesButton').on("click", function(){
		$('#itunesData').css('visibility','visible');
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
var imdb = new API('imdb', 'iMDB', 'GET', 'http://www.omdbapi.com/?s=3');
var googleBooks = new API('googleBooks', 'Google Books', 'GET', 'https://www.googleapis.com/books/v1/volumes?q=intitle:The');
var itunes = new API('itunes', 'iTunes', 'GET', 'https://itunes.apple.com/search?term=division');
