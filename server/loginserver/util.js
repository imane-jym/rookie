var app = require("../anana");
var crypto = require('crypto');
var n = require("../../share/bignumber").n;

module.exports = {
	sendData: function (data, response, errlog)
	{
		if (errlog)
			app.logger.error(errlog);
		if (data.errmsg != undefined && data.errno)
			data.errmsg = app.csv['error.csv'][data.errno].name;
		response.writeHead(200, {"Content-Type": "application/json"});
		response.write(JSON.stringify(data));
		response.end();
	},

	tokenCreate: function (passport)
	{
		var token = "";
		var md5 = crypto.createHash('md5');
		md5.update(passport.toString());
		token = md5.digest('hex');
		for (var i = 0; i < 3; i++)
		{
			var rand = Math.floor(Math.random() * 255).toString(16);
			var pos = Math.floor(Math.random() * token.length);
			token = this.insertStr(token, rand, pos);
		}
		return token;
	},

	stopProcess: function (err, errmsg)
	{
		var error = new Error(errmsg + err);
		error.name = "initError";
		throw error;
	},

	getAccountId: function (account, change)
	{
		change = (change == undefined ? true : change);
		var m;
		if (change)
			m = account; 
		else
			m = n(account.toString())
		return m.plus(1);
	},

	getRoleId: function  (role, change)
	{
		change = (change == undefined ? true : change);
		var m;
		if (change)
			m = role; 
		else
			m = n(role.toString())
		return m.div(4).plus(1).mult(4);
	},

	getTime: function ()
	{
		var myDate = new Date();
		return myDate.getTime() / 1000;
	},

	chooseServer: function (roleId, modVal)
	{
		return roleId / 4 % modVal;
	},

	insertStr: function(str, s, idx) {
		    return (str.slice(0,idx) + s + str.slice(idx));
	},
}
