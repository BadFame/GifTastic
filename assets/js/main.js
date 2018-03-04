//'Global Variables'
var button,
	buttonVal,
	encVal,
	xhr,
	enable,
	src;

//Prevents the default functionality of the form so it doesn't submit to itself. 
$("form").submit(function(e){
	e.preventDefault(e);
});

//handles the click on the add button or enter.
$("#add").click(function(){
	buildButton($("#textQuery").val());
	cleanInput();
	console.log($("#textQuery").val());
});

//handles the click on any of the created buttons.
$(".queryButton").click(function(){
	$("#grid").empty();
	getGiphy(this);
});

//helper function to build a button. It gets the value of the button as an argument. 
function buildButton (value){
		button = $('<button></button>', {
						class: 'btn btn-outline-primary queryButton',
						type: 'button',
						text: value,
						value: value, 
						onclick: 'getGiphy(this);'
						});
		//'appends the buttons to the buttons DIV'
		$('#buttons').append(button);
}

//Cleans the Input Text
function cleanInput (){
	$("#textQuery").val("");
}

//calls Giphy API, creates image thumbnails and prepends it to the Grid Div tag.
function getGiphy(e){
	buttonVal = $(e).val();
	encVal = encodeURIComponent(buttonVal);
	xhr = $.get("https://api.giphy.com/v1/gifs/search?api_key=jEqdCGWOY7yfKVXlHz4wmLGW4OdlMl6C&rating=g&q=" + encVal);
	xhr.done(function(data) {
		//'Loops thru the JSON object (data)'
		for (var i = 0; i < data.data.length; i++){
		//'prepends an image per iteration'
		 $('#grid').prepend("<img class='img-thumbnail img-responsive img-rounded' src='" + data.data[i].images.fixed_height_still.url + "' />");
		}
		//'handles the play/stop gif on all images prepended.'
		enable = $('img').click(function(){
	    	src = $(this).attr("src");

	    	if(src.indexOf("200_s.gif") > 1){
	    		$(this).attr("src", src.replace(/200_s.gif/i, "200.gif"));
	    		console.log($(this).attr("src"));
	    	}
	    	else{
	    		$(this).attr("src", src.replace(/200.gif/i, "200_s.gif"));
	    		console.log($(this).attr("src"));
	    	}
		});

	});
}
