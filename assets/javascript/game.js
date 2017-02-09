var count = 0;

$(document).keypress(function(e) {
	console.log("Key pressed");
	count += 1;
	$("#solution").text("" + count);
});