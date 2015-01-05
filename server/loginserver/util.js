var app = require("../anana");
var cryto = require('cryto');

module.exports = {
	sendData: function (data, response, errlog)
	{
		if (errlog)
			app.logger.error(errlog);
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(request.body));
		response.end();
	}

	tokenCreate: function (passport)
	{
		var token;
		var md5 = cryto.createHash('md5');
		md5.update(passport);
		var rand = Math.ceil(Math.random() * 1000000) - 1)
		token += md5.digest('hex') + rand;
		return token;
	}
}
