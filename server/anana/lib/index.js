var server = require('./server');
var router = require('./router');
var log = require('./log.js');
var redis = require('redis');
var db = require('./db');
var csv = require('./csv');
var async = require('async');

var route = {};
var timer = {};
var commonconf = {};

exports.init = function(conf, next)
{
	commonconf = conf;	

	var redisclient = redis.createClient(commonconf.redisPort, commonconf.redisIp);
	redisclient.on("error", function (err) {
		console.log("Error " + err);
	});
	exports.redis = redisclient;
	var dbconf = commonconf["mysql"];
	dbconf["supportBigNumbers"] = true;
	db.init(dbconf);
	exports.getConnection = db.getConnection;

	csv.init(conf, next);
	exports.csv = csv;
}

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

exports.timer = function(time, fn)
{
	timer[time] = fn;
}

exports.listen = function(port)
{
	server.start(router.route, route, port);
	for (pro in timer)
	{
		if (pro == 0)
			console.log("0 timer is not support");
		var t = setInterval(timer[pro], pro);
		t.unref();
	}
}

exports.logger = log;
exports.async = async;

