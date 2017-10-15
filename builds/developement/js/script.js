$("#beispiel").css('color', 'red');
$("button").on("click", function(){
	var eingabe = $("input[name=eingabe]").val();
	//console.log(eingabe);
	$("ul").append("<li>" + eingabe + "</li>")
		   .addClass("a");
});