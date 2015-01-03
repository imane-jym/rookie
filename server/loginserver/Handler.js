var app = require("../anana");
var conf = require("./common");
app.init(conf);

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

app.post("/upload", function (request, response) {
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

process.on('uncaughtException', function (err) {
	  console.error(' Caught exception: ' + err.stack);
});
