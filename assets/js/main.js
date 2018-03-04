$("form").submit(function(e){
	e.preventDefault(e);
});

function buildButton (value){
		var button = $('<button></button>', {
						class: 'btn btn-outline-primary queryButton',
						type: 'button',
						text: value,
						value: value, 
						onclick: 'getGiphy(this);'
						});
			//button.addClass("btn btn-outline-primary");
			//button.attr("type","button");
			//button.attr("value", value);
			$('#buttons').append(button);
}
function cleanInput (){
	$("#textQuery").val("");
}

	$("#add").click(function(){
		buildButton($("#textQuery").val());
		cleanInput();
		console.log($("#textQuery").val());
	});


$(".queryButton").click(function(){
	$("#grid").empty();
	getGiphy(this);
});

function getGiphy(e){
	var buttonVal = $(e).val();
	var encVal = encodeURIComponent(buttonVal);
	var xhr = $.get("https://api.giphy.com/v1/gifs/search?api_key=jEqdCGWOY7yfKVXlHz4wmLGW4OdlMl6C&q=" + encVal);
	xhr.done(function(data) {

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

    	});
}
