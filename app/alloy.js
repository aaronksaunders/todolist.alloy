var G = require("globals");
G.globalGet("todos");

G.globalSet("todos",Alloy.createCollection('Todo'));

Ti.API.info(' TODOS ' + JSON.stringify(G.globalGet("todos").toJSON(),null,2));