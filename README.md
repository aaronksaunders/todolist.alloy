# Welcome to your Appcelerator Alloy Todo Sample with SQLite Adapter #

## Basic Model and Collection fetch ##

When fetching items, you should use the callbacks of success and error. The parameters
of `model` and `response` return exactly what they say when the call is completed

	var todo = Alloy.createModel('Todo');
	
	todo.fetch({
		success : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		},
		error : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		}
	});

### Basic Model, fetch by id ###
Using the adapter with collections to get a single item, just provide the object id

	/* HOW TO FETCH A SINGLE ITEM */
	var todo = Alloy.createModel('Todo', {
	    id : "38e8aa8f-714d-3634-68b3-c825eb61b9e1"
	});
	
	// ths should return a collection
	todo.fetch({
		success : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		},
		error : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		}
	});


### Basic Collection, fetch all items ###
Using the adapter with collections to get all items

	/* HOW TO FETCH A SINGLE ITEM */
	var todo = Alloy.createModel('Todo', {
	    id : "38e8aa8f-714d-3634-68b3-c825eb61b9e1"
	});
	
	// this should return a model and not a collection
	todo.fetch({
		success : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		},
		error : function(_model, _response) {
		    Ti.API.info(JSON.stringify(_response, null, 2));
		}
	});

### Custom Collection Query, Extending Collection Object ###
To create custom queries, you can extend the model object. In the example below,
I have extended the model object with a custom query to fetch what items I completed
today.

	// app/models/todo.js
	// ------------------
	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {

	        /**
	         * returns all objects that were completed today
	         */
	        completedToday : function(_options) { 
	            var self = this;

	            // this can be more elegant, but kept it simple for demo purposes
	            //
	            // db.execute("SELECT FROM " + table + " " + opts.query.sql, opts.query.params);
	            //
	            var yesterday, tomorrow;

	            // get today and reset to midnight
				// moment().hours(0).minutes(0).seconds(1)
				//
				
				// use moment.js to calc yesterday and today
	            yesterday = moment().hours(0).minutes(0).seconds(1).subtract('days', 1);
	            tomorrow = moment().hours(0).minutes(0).seconds(1).add('days', 1);

	            // debug information
	            Ti.API.info("today " + moment().hours(0).minutes(0).seconds(1).calendar());
	            Ti.API.info("yesterday " + yesterday.calendar());
	            Ti.API.info("tomorrow " + tomorrow.calendar());

				// push the params for the query into array
	            var p = [];
	            p.push(yesterday.unix());
	            p.push(tomorrow.unix());
				
				// this is the query string that we will perform substitution on in the 
				// sql adapter
				var s =  'WHERE date_completed between ? AND ?';
				
	            // pass params
	            _options['query'] = {
	                "sql" : s,
	                "params" : p
	            };
				
				// execute normal fetch
	            self.fetch(_options);
	        },
    });
    // end extend


##The adjustments that were made to the sql adapter##

###Custom Query Support###
First we added the ability to pass in custom queries. We took this approach so the sql sync adapter stays as simple as possible and all custimization should be in the extended
model object

	// app/assets/alloy/sync/sql2.js
	// -----------------------------
	if (opts.query) {
	    // passed in predefined query
	    rs = db.execute("SELECT * FROM " + table + " " + opts.query.sql, opts.query.params);
	} else {
		// NO QUERY PASSED IN
	}

###Query Model by ID###
Then we added a conditional statement to look for the `id` on the model object that was passed in. If object provided then we just query for a single object

	// app/assets/alloy/sync/sql2.js
	// -----------------------------
	// no query provided, check for model id
	var sql = "SELECT * FROM " + table;

	// check if fetching single item
	if (model.id != undefined) {
	    sql = sql + String.format(" WHERE id = '%s'", model.id);
	}
	rs = db.execute(sql);

Appcelerator, Appcelerator Titanium and associated marks and logos are 
trademarks of Appcelerator, Inc. 

Titanium is Copyright (c) 2008-2012 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.

