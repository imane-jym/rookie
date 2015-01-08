var http = require("http");
var url = require("url");
var qs = require("querystring");

function start(route, handle, port, ip) {
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");

		if (request.method == 'GET')
		{
			request.body = url.parse(request.url, true).query;
			route(handle['get'], pathname, request, response);
		}
		else if (request.method == 'POST')
		{
			request.addListener("data", function(postDataChunk) {
				postData += postDataChunk;
				console.log("Received POST data chunk '"+
					postDataChunk + "'.");
			});

			request.addListener("end", function() {
				request.body = qs.parse(postData);
				route(handle['post'], pathname, request, response);
			});
		}
		else
		{
			console.log("this method " + request.method + " can not support");
		}
	}

	http.createServer(onRequest).listen(port, ip);
	console.log("Server has started.");
}

exports.start = start;
