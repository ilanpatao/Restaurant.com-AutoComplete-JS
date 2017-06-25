/////////////////////////////
// Written by: Ilan Patao //
// ilan@dangerstudio.com //
//////////////////////////

// Request function to fire on textbox input change
jQuery('#restaurantpicker').on('input', function() {
// Clear the search results for a new search
$("#searchresults").empty();
// Store search term in variable
var searchterm = $("#restaurantpicker").val();
// Only call if the term is over 4 characters
if (searchterm.length > 4){
	// Build the request
	var proxifyer = "https://proxifyer.herokuapp.com/";
	var url = proxifyer + "https://content.atomz.com/autocomplete/sp10/04/d2/c8/?query=" + searchterm + "&callback=myApp";
			// Request the data
			$.get(url, function (restaurantdata) {
			// Store the data in a new variable
			var data = restaurantdata;
			// Breakdown the object
			var regExp = /\(([^)]+)\)/;
			var regExec = regExp.exec(data);
			var restaurants = regExec[1]
			var locations = $.parseJSON(restaurants);
			// Go through the data and return results back to the searchdata div
			$.each(locations, function(i) {
			// Store the data in seperate variables
			var restaurant = locations[i];
			//Append results to the list
			$("#searchresults").append('<li style="margin: 10px 0;"><a href="#"><h4><i class="fa fa-cutlery" aria-hidden="true"></i>&nbsp; ' + restaurant + '</h4></a></li>');
			});
			// Output Json Preview
			var json = JSON.stringify(restaurants);
			$("#jsonresults").val(restaurants);
		});
}
});