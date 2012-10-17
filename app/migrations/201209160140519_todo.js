migration.up = function(db) {
	db.createTable({
		"columns": {
			"item":"text",
			"done":"integer"
		},
		"adapter": {
			"type":"sql",
			"collection_name":"todo"
		}
	});
};

migration.down = function(db) {
	db.dropTable("todo");
};
