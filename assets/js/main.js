
$( document ).ready(function() {
    console.log( "ready!" );
    $("form").submit(function(e){
    	e.preventDefault(e);
 	});
	function buildButton (value){
			var button = $('<button></button>', {
							class: 'btn btn-outline-primary queryButton',
							type: 'button',
							text: value,
							value: value
							});

			$('#buttons').append(button);

			$('.queryButton').click(function(){
				 		alert($(this).val());
				 		var buttonValue = $(this).val();
				 		var encButtonValue = encodeURIComponent(buttonValue);
				 		var apiKey = "jEqdCGWOY7yfKVXlHz4wmLGW4OdlMl6C";
				 		var path = "https://api.giphy.com/v1/gifs/search?";
				 		var src = path + "api_key" + apiKey + "&q=" + encButtonValue + "";

						var xhr = $.ajax({	url: src, 
											async: true, 
											method: 'GET',
											headers: {
												'Access-Control-Allow-Origin': '*'
											},
											success: function(data){
											for (var i = 0; i < data.data.length; i++){
												 $('#grid').prepend("<img class='img-thumbnail img-responsive' src='" + data.data[i].images.fixed_height_still.url + "' />");
												}

											var toggle = false;
											var enable = $('img').click(function(){
									    			var src = $(this).attr("src");

											    	if(src.indexOf("200_s.gif") > 1){
											    		$(this).attr("src", src.replace(/200_s.gif/i, "200.gif"));
											    		console.log($(this).attr("src"));
											    	}
											    	else{
											    		$(this).attr("src", src.replace(/200.gif/i, "200_s.gif"));
											    		toggle = true;
											    		console.log($(this).attr("src"));
											    	}
												});
										}});


	 		});
	}
	function cleanInput (){
		$("#textQuery").val("");
	}

		$("#add").click(function(){
			buildButton($("#textQuery").val());
			cleanInput();
			console.log($("#textQuery").val());
		});

});
