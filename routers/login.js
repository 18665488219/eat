var express=require("express");
var userschema=require('../schemar/user');
var router=express.Router();
var checkislogin=require('./check.js').checkislogin; //检查跳转页面

router.get('/',checkislogin,function(req,res){
	res.render('login');
})
router.post("/check",function(req,res){
	userschema.find({$and:[{userName:req.body.userName},{passw:req.body.passw}]},function(err,result){//查找注册信息里的数据，然后登录
		if(err){
			return res.send("登录失败");
		}
		// console.log('*-*-*',result);
		if(result.length > 0){
			//req.session（固定的）
			var _user={
				_id:result[0]._id,
				userName:result[0].userName,
				sex:result[0].sex,
				file:result[0].file,
				personal_profile:result[0].personal_profile
			}
			req.session.user=_user;//.user=result;(自定义：需要保存的东西)
			res.locals.user=req.session.user;
			console.log(_user);
			res.redirect('/');  //重定向回首页
		}
		else{
			res.send("账号不存在！！！");
		}
		})
});
module.exports=router;
