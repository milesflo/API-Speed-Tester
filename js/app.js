//Function runs by itself on page load.
(function(){
	$(document).ready(function(){
		imdbConnect();
		googleBooksConnect();
		itunesConnect(); 
	})
})();

/* This controls the amount of requests sent each press of "connect" */
var burstCount = 150;

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
		if (isNaN(apiObj.averageDelayTime) === true) {
			$('#imdbAvgTime').html("None");
		}  else {
			$('#imdbAvgTime').html(apiObj.averageDelayTime + " ms");
		}
		$('#imdbSuccessCount').html(imdb.successfulHits);
		$('#imdbFailedCount').html(apiObj.failedHits);
		$('#imdbSuccessRate').html(((apiObj.successfulHits / burstCount)*100).toFixed(0) + "%");
		// Rate limiting message
		if (apiObj.failedHits !== 0 && apiObj.failedHits !== burstCount) {
			$('#imdbRateLimitBool').html("Some");
			$('#imdbRateLimitBool').css("color" , "black");
		}  else if (apiObj.failedHits === burstCount) {
			$('#imdbRateLimitBool').html("You've been blocked.");
			$('#imdbRateLimitBool').css("color" , "red");
		} else {
			$('#imdbRateLimitBool').html("None");
			$('#imdbRateLimitBool').css("color", "green");
		}

		
		}  else if (apiObj.metaname === "googleBooks") {
			if (isNaN(apiObj.averageDelayTime) === true) {
				$('#googleBooksAvgTime').html("None");
			}  else {
				$('#googleBooksAvgTime').html(apiObj.averageDelayTime + " ms");
			}
			$('#googleBooksSuccessCount').html(apiObj.successfulHits);
			$('#googleBooksFailedCount').html(apiObj.failedHits);
			$('#googleBooksSuccessRate').html(((apiObj.successfulHits / burstCount)*100).toFixed(0) + "%");
			// Rate limiting message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== burstCount) {
				$('#googleBooksRateLimitBool').html("Some");
				$('#googleBooksRateLimitBool').css("color" , "black");
			}  else if (apiObj.failedHits === burstCount) {
				$('#googleBooksRateLimitBool').html("You've been blocked.");
				$('#googleBooksRateLimitBool').css("color" , "red");
			} else {
				$('#googleBooksRateLimitBool').html("None");
				$('#googleBooksRateLimitBool').css("color", "green");
			}
		

		}  else if (apiObj.metaname === "itunes") {
			if (isNaN(apiObj.averageDelayTime) === true) {
				$('#itunesAvgTime').html("None");
			}  else {
				$('#itunesAvgTime').html(apiObj.averageDelayTime + " ms");
			}
			$('#itunesSuccessCount').html(apiObj.successfulHits);
			$('#itunesFailedCount').html(apiObj.failedHits);
			$('#itunesSuccessRate').html(((apiObj.successfulHits / burstCount)*100).toFixed(0) + "%");
			// Rate limit message
			if (apiObj.failedHits !== 0 && apiObj.failedHits !== burstCount) {
				$('#itunesRateLimitBool').html("Some");
				$('#itunesRateLimitBool').css("color" , "black");
			}  else if (apiObj.failedHits === burstCount) {
				$('#itunesRateLimitBool').html("You've been blocked.");
				$('#itunesRateLimitBool').css("color" , "red");
			} else {
				$('#itunesRateLimitBool').html("None");
				$('#itunesRateLimitBool').css("color", "green");
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
		$('#imdbButton').prop('disabled', true);
		setTimeout(function(){
			$('#imdbButton').prop('disabled', false)
		}, 25*burstCount);
		imdb.delayTimesCollection = [];
		$('#imdbData').show();
		imdb.successfulHits = 0;
		imdb.failedHits = 0;
		for (var i = 0; i < burstCount; i++) {
			setTimeout(generateCallback(i, imdb), 5 * i);
		};
	});
};

//Google books AJAX. Connected to a button
function googleBooksConnect(){
	$('#googlebooksButton').on("click", function(){
		$('#googlebooksButton').prop('disabled', true);
		setTimeout(function(){
			$('#googlebooksButton').prop('disabled', false)
		}, 25*burstCount);
		$('#googleBooksData').show();
		googleBooks.delayTimesCollection = [];
		googleBooks.successfulHits = 0;
		googleBooks.failedHits = 0;
		for (var i = 0; i < burstCount; i++) {
			setTimeout(generateCallback(i, googleBooks), 5 * i);
		};
	});
};

//Itunes AJAX. Connected to button
function itunesConnect(){
	$('#itunesButton').on("click", function(){
		$('#itunesButton').prop('disabled', true);
		setTimeout(function(){
			$('#itunesButton').prop('disabled', false)
		}, 25*burstCount);
		$('#itunesData').show();
		itunes.delayTimesCollection = [];
		itunes.successfulHits = 0;
		itunes.failedHits = 0;
		for (var i = 0; i < burstCount; i++) {
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
var itunes = new API('itunes', 'iTunes', 'GET', 'https://itunes.apple.com/search?term=interpol');
