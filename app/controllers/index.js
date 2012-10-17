function doClick(e) {
	alert($.label.text);
}

$.index.open();

// get the data
todos.fetch({
	add : false
});
