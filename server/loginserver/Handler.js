var app = require("../anana");
var conf = require("./common");
var util = require("./util");
var enu = require("../share/enumDefine");
var n = require("../share/bignumber").n;
app.init(conf, dbInit);

var maxAccount = 0;
var maxRole = 0;

function dbInit(err){
	if (err)
	{
		util.stopProcess(err, "app init fail errmsg:");
	}
	app.async.series([
			function(callback)
			{
				app.getConnection('db0').query("select max(passport_id) as max_id from passport_info;", callback);
			},
			function(callback)
			{
				app.getConnection('db0').query("select max(role_id) as max_id from re_passport_player;", callback);
			}
	],

	function (err, results)
	{
		if (err)
			util.stopProcess(err, "get max id fail");
		
		maxAccount = n(results[0].max_id || "10000");	
		maxRole = n(results[0].max_id || "10000")
		var count = 0;
		var len = 1;
	for (var i = 0; i < len; i++)
	{
		var dbkey = "db" + i;
		var asynnumber = len * 2;
		var next = execMain;
		app.getConnection(dbkey).query(
			"CREATE TABLE IF NOT EXISTS passport_info (" +                                   
			"passport_id    BIGINT      UNSIGNED    NOT NULL AUTO_INCREMENT,"  +
			"passport       VARCHAR(128)    CHARACTER SET utf8 NOT NULL," +
			"pwd            VARCHAR(64) CHARACTER SET utf8 NOT NULL," +                   
			"mail           VARCHAR(64) CHARACTER SET utf8 NOT NULL," +                  
			"uid            VARCHAR(128) CHARACTER SET utf8 NOT NULL," +                 
			"token          VARCHAR(128) CHARACTER SET utf8 NOT NULL," +                 
			"platform       MEDIUMINT   UNSIGNED    NOT NULL," +                
			"auth_type      TINYINT     UNSIGNED    NOT NULL," +
			"create_time    INT         UNSIGNED    NOT NULL," + 
			"gm_auth        TINYINT     UNSIGNED    NOT NULL," + 
			"reg_ip         VARCHAR(64) CHARACTER SET utf8 NOT NULL," +                   
			"reg_device     VARCHAR(32) CHARACTER SET utf8 NOT NULL," +                   
			"reg_device_type VARCHAR(64) CHARACTER SET utf8 NOT NULL," +                  
			"last_login_time    INT     UNSIGNED    NOT NULL," +
			"PRIMARY KEY (passport_id)," +
			"INDEX (passport, platform, auth_type)," +
			"INDEX (uid, platform, auth_type)," +
			"INDEX (uid, platform, auth_type)," +
			") ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT = 10000;", function(error, results){
				if (err)
				{
					util.stopProcess(err, "create table passport_info");
				}
				if (++count == asynnumber)
					next();
		});
		app.getConnection(dbkey).query(
				"CREATE TABLE IF NOT EXISTS re_passport_player (" + 
				"role_id        INT         UNSIGNED    NOT NULL," +
				"passport_id    BIGINT      UNSIGNED    NOT NULL," +
				"server_id      SMALLINT    UNSIGNED    NOT NULL," +
				"server_id_origin SMALLINT  UNSIGNED    NOT NULL," +
				"create_time    INT         UNSIGNED    NOT NULL," +
				"PRIMARY KEY (role_id)" +
				") ENGINE=InnoDB DEFAULT CHARSET=utf8;", function(error, results){
				if (err)
				{
					util.stopProcess(err, "create table re_passport_player");
				}
				if (++count == asynnumber)
					next();
		});
	}
	})
}

function execMain(err)
{

app.get("/monitor", function (request, response) {
	console.log("Request handler monitor was called.");

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="20" cols="60"></textarea>'+
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
});

app.post("/registerLogin", function (request, response) {
	var body = request.body;
	app.getConnection('db0').query("select passport_id,pwd from passport_info where passport = ?? and platform = ?? and auth_type = ??", [body.account, body.platformId, enu.AUTH_TYPE.LOGIN_AUTH_TYPE_ACCOUNT], function(err, results)
		{
			res = {
				errno: 0,
				errmsg: "",
				loginToken: ""
			};
			if (err)
			{
				res.errno = enu.ERRNO.DB_ERROR;
				util.sendData(res, response, "db error msg" + err);
				return;
			}
			if (!result[0] || result[0].pwd != body.pwdMd5)
			{
				res.errno = enu.ERRNO.ACCOUNT_NOT_MATCH;
				util.sendData(res, response);
				return;
			}

			authAccount(request, response, results[0].passport_id, res);
		});
});

function authAccount(request, response, passportId, res)
{
	res.loginToken = util.tokenCreate(passportId);
	obj = {passportId:passportId};
	app.redis.set(res.loginToken, JSON.stringify(obj), function(err, reply){
		if (err)
	{
		res.errno = enu.ERRNO.SYSTEM_ERROR;
		util.sendData(res,response);
		return;
	}
	app.redis.expire(res.loginToken, 60, function(err, reply)
		{
			if (err)
	{
		res.errno = enu.ERRNO.SYSTEM_ERROR;
		util.sendData(res,response);
		return;
	}
	util.sendData(res, response);
		});
	});
}

app.post("/platformLogin", function (request, response) {
	var body = request.body;
	app.getConnection('db0').query("select passport_id from passport_info where passport = ?? and platform = ?? and auth_type = ??", [body.platformToken, body.platformId, enu.AUTH_TYPE.LOGIN_AUTH_TYPE_PLATFORM], function(err, results)
		{
			res = {
				errno: 0,
				errmsg: "",
				loginToken: ""
			};
			if (err)
			{
				res.errno = enu.ERRNO.DB_ERROR;
				util.sendData(res, response, "db error msg" + err);
				return;
			}
			if (!result[0])
			{
				var passportId = util.getAccountId(maxAccount).toString();
				app.getConnection('db0').query("insert into passport_info(passport_id, passport, uid,platform,auth_type,create_time,reg_device,reg_device_type) values(??, ??, ??, ??, ??, ??, ??, ??)", [passportId, body.platformToken, body.uid, body,platformId, enu.AUTH_TYPE.LOGIN_AUTH_TYPE_PLATFORM, util.getTime(), body.regDevice, body.regDeviceType], function(err, result)
					{
						if (err)
							util.stopProcess(err, "create account fail");
						authAccount(request, response);	
					});
			}
			else
			{
				authAccount(request, response, passportId, res);
			}
		});
});

app.post("/fastLogin", function (request, response) {
	var body = request.body;
	app.getConnection('db0').query("select passport_id from passport_info where uid = ?? and platform = ?? and auth_type = ??", [body.uid, body.platformId, enu.AUTH_TYPE.LOGIN_AUTH_TYPE_FAST], function(err, results)
		{
			res = {
				errno: 0,
				errmsg: "",
				loginToken: ""
			};
			if (err)
			{
				res.errno = enu.ERRNO.DB_ERROR;
				util.sendData(res, response, "db error msg" + err);
				return;
			}
			if (!results)
			{
				var passportId = util.getAccountId(maxAccount).toString();
				app.getConnection('db0').query("insert into passport_info(passport_id, uid,platform,auth_type,create_time,reg_device,reg_device_type) values(??, ??, ??, ??, ??, ??, ??, ??)", [passportId, body.platformToken, body.uid, body,platformId, enu.AUTH_TYPE.LOGIN_AUTH_TYPE_FAST, util.getTime(), body.regDevice, body.regDeviceType], function(err, result)
					{
						if (err)
							util.stopProcess(err, "create account fail");
						authAccount(request, response, passportId, res);	
					});
			}
			else
			{
				authAccount(request, response, results[0].passport_id, res);
			}
		});
});

app.post("/chooseServer", function (request, response) {
	var body = request.body;
	app.redis.get(body.loginToken, function(err, reply)
		{
			res = {
				errno: 0,
				errmsg: "",
				url: "",
				roleId: 0
			};
			if (err || !reply)
			{
				res.errno =  enu.ERRNO.ACCOUNT_NOT_LOGIN;
				util.sendData(res, response);
				return;
			}
			var obj = JSON.parse(reply);
			app.getConnection('db0').query("select role_id from re_passport_player where passport_id = ?? and server_id = ??", [obj.passportId, 0], function (err, results){
			if (err)
			{
				res.errno = enu.ERRNO.DB_ERROR;
				util.sendData(res, response, "db fail");
				return;
			}
			if (!results)
			{
				res.roleId = getRoleId(maxRole);
				var choose = util.chooseServer(res.roleId, conf['serverList'].length); 
				obj.roleId = res.roleId;
				app.async.series(
					[
					function (cb){
						app.getConnection('db0').query("insert into re_passport_player(role_id, passport_id, server_id, create_time) values(??, ??, ??, ??)", [getRoleId(maxRole), obj.passportId, 0, util.getTime()], cb);
					},
					function (cb){
						app.redis.set(body.loginToken, JSON.stringify(obj), cb) 
					},
					function (cb){
						app.redis.expire(body.loginToken, 60, cb);
					}
					],
					function (err, results){
						if (err)
						{
							res.errno = enu.ERRNO.SYSTEM_ERROR;
							util.sendData(res, response, "db or redis error");
							return;
						}
						res.url = conf['serverList'][choose];
						util.sendData(res, response);
					}
					);
			}
			else
			{
				res.roleId = results[0].role_id;
				var choose = util.chooseServer(res.roleId, conf['serverList'].length); 
				obj.roleId = res.roleId;
				app.async.series(
					[
					function (cb){
						app.redis.set(body.loginToken, JSON.stringify(obj), cb) 
					},
					function (cb){
						app.redis.expire(body.loginToken, 60, cb);
					}
					],
					function (err, results){
						if (err)
						{
							res.errno = enu.ERRNO.DB_ERROR;
							util.sendData(res, response, "redis fail");
							return;
						}
						res.url = conf['serverList'][choose];
						util.sendData(res, response);
					});
			}
			})
		});
});

app.timer('5000', function(){
	console.log("timer 5s handler");
	app.logger.trace("log trace");
	app.logger.debug("log debug");
	app.logger.info("log info");
	app.logger.warn("log warn");
	app.logger.error("log error");
	app.logger.fatal("log fatal");
	console.log("timer 5s handler");
	app.redis.get('test', function(err, reply){
	console.log(reply);
});
	app.getConnection("db0").query(
		'SELECT * FROM account', function(err, rows, fields) {
			//if (err) throw err;
			if (err)
			{
				console.log('error', err);
				return;
			}

			console.log('The solution is: ', rows);
		}
		);
});


app.listen(8888);
}

process.on('uncaughtException', function (err) {
	  console.error(' Caught exception: ' + err.stack);
	  if (err.name == "initError")
			exit(0);
});
