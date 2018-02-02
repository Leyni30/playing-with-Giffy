$(document).ready(function(){
var topic = ["piano", "violin", "cello", "contrabass", "guitar"];



function addButton(){
$("#btn-space").empty();
for ( var i=0; i<topic.length; i++){

	var makeButton = $("<button>");
	makeButton.addClass("fancy");
	makeButton.attr("id", "newButton");
	makeButton.attr("data-topic", topic[i])
	makeButton.text(topic[i]);
	makeButton.attr("type", "button");
	$("#btn-space").append(makeButton);
	//console.log(makeButton);

	} 
}
addButton();

$(document).on("click", ".fancy", function(){

	var instrument = $(this).attr("data-topic");
	gifSearch(instrument)
});

$("#submit").on("click", function(){
	var newInstrument = $("#new-instrument").val().trim();
	if (!topic.includes(newInstrument)&& newInstrument!==""){
		topic.push(newInstrument);
		addButton();
	}
	
});

function gifSearch(searchTerm){
	var queryString = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=5";
	 $.ajax ({
		url: queryString,
		method: "GET"
	}).then(function(response){
		 //[0].images.original_still.url);

		//console.log(response.data)
		generateGifs(response.data)
	})

}
function generateGifs(arr){
	console.log(arr)
	for(var i=0;i <arr.length;i++){
		var stillImage = arr[i].images.original_still.url;
		var animateImage = arr[i].images.original.url;
		console.log(stillImage)

		// $(".container").append(stillImage);
		var img = $("<img>");

		img.attr("src", stillImage);
		img.addClass("gif");
		img.attr("data-state", "still");
		img.attr("data-still", stillImage);
		img.attr("data-animate", animateImage);
		$(".container").prepend(img);


		

	}
}


$(".container").on("click", ".gif", function() {
     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
     var state = $(this).attr("data-state");
     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
     // Then, set the image's data-state to animate
     // Else set src to the data-still value
     if (state === "still") {
       $(this).attr("src", $(this).attr("data-animate"));
       $(this).attr("data-state", "animate");
     } else {
       $(this).attr("src", $(this).attr("data-still"));
       $(this).attr("data-state", "still");
     }
   });

});






