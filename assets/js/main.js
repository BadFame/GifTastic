//'Global Variables'
var button,
	buttonVal,
	encVal,
	xhr,
	enable,
	src,
	initButtonExec,
	initButtonsMeta,
	initButtonObj;

	initButtonsMeta = {
					"buttons": [
						{
							"textVal": "Trunks",
							"class": "btn btn-outline-primary queryButton",
							"type": "'button'",
							"onClick": "getGiphy(this);"
						},
		   				{	
		   					"textVal": "Vegeta",
							"class": "btn btn-outline-primary queryButton",
							"type": "button",
							"onClick": "getGiphy(this);"
						},
					   	{				
					   		"textVal": "Goku",
							"class": "btn btn-outline-primary queryButton",
							"type": "button",
							"onClick": "getGiphy(this);"
						},
		   				{	
		   					"textVal": "Broly",
							"class": "btn btn-outline-primary queryButton",
							"type": "button",
							"onClick": "getGiphy(this);"
						}
							   ]	
		  		  };
	//'Creates and appends Initial buttons menu'	  		  
	initButtonExec =  function (butons){
							for (var i = 0; i < butons.buttons.length; i++){
							//'prepends an image per iteration'
							initButtonObj = $('<button></button>', {
											class: butons.buttons[i].class,
											type: butons.buttons[i].type,
											text: butons.buttons[i].textVal,
											value: butons.buttons[i].textVal, 
											onclick: butons.buttons[i].onClick
										});
									//'appends the buttons to the buttons DIV'
							$('#buttons').append(initButtonObj);
		 
							}

						};
	//'Executes initial buttons'
	initButtonExec(initButtonsMeta);

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

//'remove alerts'
$('#textQuery').on('input',function(e){
    $('#alert').removeClass("alert alert-danger").text('');
});

//helper function to build a button. It gets the value of the button as an argument. 
function buildButton (value){
		button = $('<button></button>', {
						class: 'btn btn-outline-primary queryButton',
						type: 'button',
						text: value,
						value: value,
						id: value, 
						onclick: 'getGiphy(this);'
						});
		//'appends the buttons to the buttons DIV'
		if(value !== ""){
			$('#buttons').append(button);
		}
		else{
				$('#alert').addClass("alert alert-danger").text('We cannot accept an empty Giphy!'); 
		};
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
		//'If no Giphy query found: Show an Alert, Remove Button'
		if(data.pagination.count == 0){
			$('#alert').addClass("alert alert-danger").text('Sorry, we do not have Giphys for that!'); 
			buttonToDelete = document.getElementById(buttonVal);
			$(buttonToDelete).remove();
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
