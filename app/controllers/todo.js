var addBtn = Ti.UI.createButton({
	title : '+'
});

addBtn.addEventListener('click', function() {
	var controller = Alloy.getController("add");
	controller.addWin.open();
});
$.todoWin.setRightNavButton(addBtn);

todos.on('fetch', function() { 
	updateContent(todos);
});

$.todoTable.on('click', function(e) {
	Ti.API.info('ID:' + e.rowData.id);

	// get item and save it BUG !!! THIS SHOULD WORK
	if (false) {
		todos.get(e.rowData.id).set({
			"done" : 1
		}).save();
	} else {
		// HACK
		var m = todos.where({
			id : e.rowData.id
		});

		m[0].set({
			"done" : 1
		}).save();
	}

	// update view
	todos.fetch({add:false});
});

function updateContent(_collection) {
	var rows = [], i = 0, len = _collection.length; 
	for (; i < len; i++) {
		var _i = _collection.at(i);
		rows.push(Ti.UI.createTableViewRow({
			title : _i.get("item") + " " + (_i.get("done") ? "DONE" : ""),
			id : _i.id
		}));

		Ti.API.info(JSON.stringify(_i, null, 2));
	}
	$.todoTable.setData(rows);
};

