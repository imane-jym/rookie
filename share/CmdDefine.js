module.exports = {
	entry:
	{
		url:"http://127.0.0.1:8080"
	}
	/* method: 使用POST方法, 请求使用application/x-www-form-urlencoded;返回都是application/json格式*/
	protol:[
		/** 注册账户登录 temp no use
		 * {
		 * [string] account 
		 * [string] pwdMd5 
		 * [number] platformId 
		 * }
		 * {
		 * [number] errno 0:成功 其他失败
		 * [string] errmsg
		 * [string] loginToken
		 * }
		 * */                       
		"/registerLogin",
		/** 平台登录(已通过平台账户登录) 
		 * {[string] uid 快速登录设备号
		 * [string] platformToken 平台登陆唯一识别串                            
		 * [uint16] platformId 平台类别 101 开始
		 * [string] regDevice 设备名 
		 * [string] regDeviceType 设备型号
		 * }
		 * {
		 * [number] errno 0:成功 其他失败
		 * [string] errmsg
		 * [string] loginToken
		 * }
		 */
		"/platformLogin",
		/** 快速登录 
		 * {
		 * [string] uid 
		 * [uint16] platformId [string] regDevice设备名 [string] regDeviceType 设备型号
		 * }
		 * {
		 * [number] errno 0:成功 其他失败
		 * [string] errmsg
		 * [string] loginToken
		 * }
		 * */ 
		"/fastLogin",
		/*
		 * 请求进入GameServer 
		 * {
		 * [string] loginToken
		 * [string] clientVersion 
		 * }
		 * {
		 * [number] errno 0=成功 1=服务器不存在 2=版本不符合 3=游戏帐号被禁 4=系统错误
		 * [errmsg] errmsg
		 * [string] url 
		 * [number] roleId
		 * }
		 */                             
		"/chooseServer",
		
		/* 注册账户  temp no use
		 * {
		 * [string] uid 
		 * [string] account 
		 * [string] pwdMd5 
		 * [string] mail                        
		 * [uint16] platformId 
		 * [string] 设备名 
		 * [string] 设备型号                                       
		 * } 
		 * {
		 * [number] errno
		 * [string] errmsg
		 * }
		 * */                                                    
		"/register",

		/*
		 * 修改密码（需要先登录） temp no use
		 * {
		 * [string] loginToken
		 * [string] newPwdmd5  
		 * }
		 * {
		 * [number] errno
		 * [string] errmsg
		 * }
		 * */                                              
		"/modiftPassword"
}
