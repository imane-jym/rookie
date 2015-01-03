var log4js = require('log4js');
var logConf = require("../config/log4js.json");

log4js.configure(logConf);
//log4js.configure({
//	  appenders: [
//	    { type: 'console' },{
//								      type: 'file', 
//	      filename: 'logs/access.log', 
//	      maxLogSize: 1024,
//	      backups:4,
//	      category: 'normal' 
//	    }
//  ],
//	  replaceConsole: true
//});

//var logger = log4js.getLogger(commonconf.logCategory);
var logger = log4js.getLogger();

module.exports = logger;
