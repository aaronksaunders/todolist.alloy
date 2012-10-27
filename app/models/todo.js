exports.definition = {

    config : {
        "columns" : {
            "item" : "text",
            "done" : "integer",
            "date_completed" : "date"
        },
        "adapter" : {
            "type" : "sql2",
            "collection_name" : "todo"
        }
    },

    extendModel : function(Model) {
        _.extend(Model.prototype, {

            // extended functions go here
            
            /**
             * returns all objects that were completed today
             */
            completedToday : function() {
                
            },

            validate : function(attrs) {
                for (var key in attrs) {
                    var value = attrs[key];
                    if (key === "item") {
                        if (value.length <= 0) {
                            return 'Error: No item!';
                        }
                    }
                    if (key === "done") {
                        if (value.length <= 0) {
                            return 'Error: No completed flag!';
                        }
                    }
                }
            }
        });
        // end extend

        return Model;
    },

    extendCollection : function(Collection) {
        _.extend(Collection.prototype, {

            // extended functions go here

        });
        // end extend

        return Collection;
    }
}

