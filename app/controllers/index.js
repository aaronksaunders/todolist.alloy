function doClick(e) {
    alert($.label.text);
}

var globals = require("globals");
var todos = globals.globalGet("todos");

$.index.open();

// get the data
todos.fetch({
    add : false,
});


/* HOW TO FETCH A SINGLE ITEM */
//var todo = Alloy.createModel('Todo', {
//    id : "38e8aa8f-714d-3634-68b3-c825eb61b9e1"
//});
//todo.fetch(); 