var app = require("../anana");
var conf = require("./common");
app.init(conf);

(function (i, len, callback){
	 var count = 0;
	 for (var i = 0; i < len; i++)
	{
		var dbkey = "db" + i;
		var asynnumber = len * 3;
		app.getConnection(dbkey).query(
			"CREATE TABLE IF NOT EXISTS passport_info (" +                                   
			"passport_id    BIGINT      UNSIGNED    NOT NULL,"  +                         
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
			"PRIMARY KEY (passport_id)" +
			") ENGINE=InnoDB DEFAULT CHARSET=utf8;", function(){
				if (++count == asynnumber)
					execMain();
		});
		app.getConnection(dbkey).query(
				"CREATE TABLE IF NOT EXISTS re_passport_player (" + 
				"role_id        INT         UNSIGNED    NOT NULL," +
				"passport_id    BIGINT      UNSIGNED    NOT NULL," +
				"server_id      SMALLINT    UNSIGNED    NOT NULL," +
				"server_id_origin SMALLINT  UNSIGNED    NOT NULL," +
				"create_time    INT         UNSIGNED    NOT NULL," +
				"PRIMARY KEY (role_id)" +
				") ENGINE=InnoDB DEFAULT CHARSET=utf8;", function(){
				if (++count == asynnumber)
					execMain();
		});
		app.getConnection(dbkey).query(
				"CREATE TABLE IF NOT EXISTS re_passport_player (" + 
				"role_id        INT         UNSIGNED    NOT NULL," +
				"passport_id    BIGINT      UNSIGNED    NOT NULL," +
				"server_id      SMALLINT    UNSIGNED    NOT NULL," +
				"server_id_origin SMALLINT  UNSIGNED    NOT NULL," +
				"create_time    INT         UNSIGNED    NOT NULL," +
				"PRIMARY KEY (role_id)" +
				") ENGINE=InnoDB DEFAULT CHARSET=utf8;", function(){
				if (++count == asynnumber)
					execMain();
		});
	}
})(0, 1, execMain);

function execMain()
{

app.get("/index", function (request, response) {
	console.log("Request handler 'start' was called.");

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
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "application/json"});
	response.write(JSON.stringify(request.body));
	response.end();
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
});
