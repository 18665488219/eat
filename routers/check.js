module.exports={
	//检查是否是登录状态
	//如果是登录状态，此时不应该打开登录页面，应该跳转到首页
	//如果是未登录状态，就应该跳转到登录页面
	checkislogin:function(req,res,next){
		
		if(req.session.user){  //如果req.session.user  有值则说明已经登录了，如果没有值，则返回登录页面
			return res.redirect('/');  //重定向回首页
		}else{
			return res.render('login');
		};
		next();  //把执行权交给下一个
	},
	checknotlogin:function(req,res,next){
		res.locals.user=req.session.user;
		if(!req.session.user){
			return res.redirect('/login');
		}
		next();
	}
}