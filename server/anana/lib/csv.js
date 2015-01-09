var csv = require('csv');
var fs = require('fs');

module.exports = {
	init: function(conf, next)
	{
		var count = 0;
		var self = this;
		for (var i = 0; i < conf.csv.files.length; i++)
		{
			var j = i;
			var parser = csv.parse( {'columns':true, 'objname': "index"},function(err, data){
				if (err)
				{
					next(err);				
				}
				self[conf.csv.files[j]] = data;
				if (++count == conf.csv.files.length)
				{
					next(null);
				}
			});
			fs.createReadStream(conf.csv.base_file + conf.csv.files[i]).pipe(parser);
		}	
		next(null);
	}
}
