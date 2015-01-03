var mysql = require('mysql');
var dbMap = {};

module.exports = {

	init: function(conf)
	{
		for (var i in conf)
		{
			dbMap[i] = mysql.createPool(conf[i]);
		}
	},

	getConnection: function(name)
	{
		return dbMap[name];
	}
}
