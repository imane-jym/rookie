module.exports = {
	"entry":
	{
		"address":"127.0.0.1","port":8080
	}
	/* method: 使用POST方法, 请求使用application/x-www-form-urlencoded;返回都是application/json格式*/
	"protol":[
		/*
		 * login 请求
		 *	{ username , password}
		 *  { errmsg, token}
		 */
		{"cmd":"/login"}
		/*
		 * login 请求
		 *	{ token}
		 *  { errmsg, address, port}
		 */
		{"cmd":"/serverlist"}
	]
}