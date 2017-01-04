		
		var sportsFigure = ["Odell Beckham", "David Beckham", "Eli Manning", "Eli Apple", "Carmelo Anthony", "Porzingis", "Tiger Woods"];
		for (var i = 0; i < sportsFigure.length; i++) {
			console.log('inside loop= var i=' + i);

			$("#myButtons").append("<button id=" + sportsFigure[i] + " class='btn-default btn-med'>" + sportsFigure[i] + '</button>');
			console.log('append button');
		
		};
		$('document').ready(function(){
		    $('button').click(function(){
		        var anythis = $(this);
		        console.log(anythis);
		        var buttonSearchVal = $(this).context.textContent;
		        console.log(buttonSearchVal)
		        runQuery (buttonSearchVal);
		        return false;
		       // event.preventDefault();
		    });
		 });

		// query request
		function runQuery(searchVal) {
			var apiKey = 'api_key=dc6zaTOxFJmzC';
			var searchUpper = searchVal.toUpperCase();
			var searchRequest = '&q=' + searchVal;
			var limitRecords = '&limit=10'
			var queryURL = 'https://api.giphy.com/v1/gifs/search?' + apiKey + searchRequest + limitRecords;

			$.ajax({
			url: queryURL,
			method: 'GET'})
			.done(function(result) {
				console.log(result);
				var arrayDocs = result.data.length;
				for (var j = 0; j <  arrayDocs; j++) {
					var a = result.data[j].images.downsized.url;
					console.log('var a=' + a);
					var b = result.data[j].images.downsized_still.url;
					console.log('var b=' + b);
					var image1 = $('<img>').attr('src', a);
					image1.addClass('img-thumbnail');
					// Had tutor look at my code up to this point he said  setup attr for data-still, data-animated, data-state (switch src depending on state can't find proper explaination online got to throw in towel will come back to it too much wasted time)
					var gifRating = searchUpper + '  Rating: ' + result.data[j].rating;
					$('#viewImage').append(image1); 
					$('#viewImage').append('<p>' + gifRating + '</p>');
					$(image1).click(function(){
				        var whatisthis = $(this);
				        console.log(whatisthis);
				        var myimageval = $(this).context.src;
				        var image2 = b;
				        // runQuery (buttonSearchVal);
				        // return false;
				       // event.preventDefault();

						$(function(){
						  $(".img-thumbnail").on('click', function() {
						  	console.log('here inside anon function');
						    if ($(this).attr("class") == "img-thumbnail") {
						    	this.src = this.src.replace(b,a);

						    	console.log('did a replace b for a');
						    	console.log(this.src);
						    } else {
						    	this.src = this.src.replace(a,b);
						    }
						  });
						});


				    });


				};

			});
		};
