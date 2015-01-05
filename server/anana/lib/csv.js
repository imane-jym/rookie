var csv = require('csv');
var fs = require('fs');

module.exports = {
	init: function(conf, next)
	{
		var count = 0;
		for (var i = 0; i < conf.csv.file.length; i++)
		{
		var parse = csv.parse( {'columns':true, 'objname': "index"},function(err, data){
			if (err)
			{
				next(err);				
			}
			if (++count == conf.csv.file.length)
			{
				this[conf.csv.file[i]] = data;
				next(null);
			}
		});
			fs.createReadStream(conf.csv.base_file + conf.csv.file[i]).pipe(parser);
		}	
	}
}
