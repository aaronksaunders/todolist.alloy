var globals = require("globals");
var moment = require("moment");
var todos = globals.globalGet("todos");

todos.on('fetch', function() {
    updateContent(todos);
});

$.todoTable.on('click', function(e) {
    Ti.API.info('ID:' + e.rowData.id);

    todos.get(e.rowData.id).set({
        "done" : 1,
        "date_completed" : moment().unix()
    }).save();

    // update view
    todos.fetch({
        add : false
    });
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

        // moment.unix(i.date_update).calendar() 
        _i.get("date_completed") && Ti.API.info("time " + moment.unix(_i.get("date_completed")).calendar());
    }
    $.todoTable.setData(rows);
};

function addToDoItem() {
    var controller = Alloy.getController("add");
    controller.addWin.open();
}

//
// STUB FOR ANDROID MENUS ON IOS
//
if (Titanium.App.iOS === undefined) {

    $.todoWin.activity.onCreateOptionsMenu = function(e) {

        var menu = e.menu;
        var menuItem = menu.add({
            title : "Add Item"
        });
        menuItem.addEventListener("click", addToDoItem);
    }
} else {
    var addBtn = Ti.UI.createButton({
        title : '+'
    });
    addBtn.addEventListener('click', addToDoItem);
    $.todoWin.setRightNavButton(addBtn);

}

