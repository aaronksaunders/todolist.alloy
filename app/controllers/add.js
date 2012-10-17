$.addBtn.addEventListener('click', function() {
	// add todo item

	var todo = Alloy.createModel('Todo', {
		item : $.itemField.value,
		done : 0
	});
	todos.add(todo);

	todo.save();

	$.addWin.close();

	todos.fetch({
		add : false
	});
});

$.cancelBtn.addEventListener('click', function() {
	$.addWin.close();
});
