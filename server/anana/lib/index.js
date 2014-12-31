var server = require('./server');
var router = require('./router');

var route = {};

exports.get = function(pathname, fn)
{
	route.get = route.get || {};
	route.get[pathname] = fn;
}

exports.post = function(pathname, fn)
{
	route.post = route.post || {};
	route.post[pathname] = fn;
}

exports.listen = function(port)
{
	server.start(router.route, route, port);
}
