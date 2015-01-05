module.exports = {
	entry:
	{
		"address":"127.0.0.1","port":8080
	}
	/* method: 使用POST方法, 请求使用application/x-www-form-urlencoded;返回都是application/json格式*/
	protol:[
		/** 注册账户登录 
		 * {
		 * [string] account 
		 * [string] pwd_md5 
		 * [number] platform_id 
		 * }
		 * {
		 * [number] errno 0:成功 其他失败
		 * [string] errmsg
		 * [string] LoginToken
		 * }
		 * */                       
		"/registerLogin",
		/** 平台登录(已通过平台账户登录) 
		 * {[string] uid 快速登录设备号
		 * [string] platform_token 平台登陆唯一识别串                            
		 * [uint16] platform_id 平台类别 101 开始
		 * [string] 设备名 
		 * [string] 设备型号
		 * }
		 * {
		 * [number] errno 0:成功 其他失败
		 * [string] errmsg
		 * [string] LoginToken
		 * }
		 */
		"/platformLogin",
		/** 快速登录 
		 * {
		 * [string] uid 
		 * [uint16] platform_id [string] 设备名 [string] 设备型号                 
		 * }
		 * {
		 * [number] errno 0:成功 其他失败
		 * [string] errmsg
		 * [string] LoginToken
		 * }
		 * */ 
		"/fastLogin",
		/*
		 * 请求进入GameServer 
		 * {
		 * [string] client_version 
		 * }
		 * {
		 * [number] errno 0=成功 1=服务器不存在 2=版本不符合 3=游戏帐号被禁 4=系统错误
		 * [errmsg] errmsg
		 * [string] ip
		 * [number] port
		 * [number] role_id
		 * }
		 */                             
		"/chooseServer",
		
		/* 注册账户 
		 * {
		 * [string] uid 
		 * [string] account 
		 * [string] pwd_md5 
		 * [string] mail                        
		 * [uint16] platform_id 
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
		 * 修改密码（需要先登录）
		 * {
		 * [string] Logintoken
		 * [string] new_pwd_md5  
		 * }
		 * {
		 * [number] errno
		 * [string] errmsg
		 * }
		 * */                                              
		"/modiftPassword"
}
