var app = require("../anana");
var cryto = require('cryto');

module.exports = {
	sendData: function (data, response, errlog)
	{
		if (errlog)
			app.logger.error(errlog);
		if (data.errmsg && data.errno)
			data.errmsg = app.csv['error.csv'][errno].name;
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

	stopProcess: function (err, errmsg)
	{
		var error = new Error(errmsg + err);
		error.name = "initError";
		throw error;
	}

	getAccountId: function (account)
	{
		account.plus(1);
		return account;
	}

	getRoleId: function  (role)
	{
		role.div(4).plus(1).mult(4);
		return role;
	}

	getTime: function ()
	{
		var myDate = new Date();
		return myDate.getTime() / 1000;
	}

	chooseServer: function (roleId, modVal)
	{
		return roleId / 4 % modVal;
	}
}
