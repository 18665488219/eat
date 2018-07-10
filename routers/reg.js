var express=require("express");
var router=express.Router();
var userschema=require('../schemar/user');
var multer=require("multer");  //引入multer
// var upload=multer({dest:"uploads/"});  //传入一个对象和uploads/:上传东西的路径
var storage=multer.diskStorage({
	destination:function(req,file,cb){//destination 是用来确定上传的文件应该存储在哪个文件夹中。
		cb(null,"public/img") //目录下的tmp文件夹
	},
	filename:function(req,file,cb){
		cb(null,file.originalname);
	}
})
var upload=multer({storage:storage})
router.get('/',function(req,res){
	res.render('register');
})
router.get('/checkname',function(req,res){  //检验用户名是否可以注册
	var name=req.query.userName;  //通过用户名查找数据库中用户名是否相同，如果相同则提示用户此用户名已被注册
	userschema.find({userName:name},function(err,result){
		if(result.length > 0){
			res.send("no");  //不可注册
		}else{
			res.send("ok");  //可注册
		}
	})
})
router.post('/reg',upload.single("file"),function(req,res){
	userschema.find({userName:req.body.userName},function(err,result){
		if(result.length > 0){  //查找数据库里用户名是否与新注册的用户名相同，如果相同则提示信息并让其重新输入，否则反之
			userschema.find(function(err,result){ 
				return res.send("已存在用户，请重新输入！");
			})
		}else{
			var userName=req.body.userName,
				passw=req.body.passw,
				r_passw=req.body.r_passw,
				sex=req.body.sex,
				file=req.file.filename,
				personal_profile=req.body.personal_profile;

			var user=new userschema({  //获取注册页面里注册的信息，然后返回到数据库里
				userName:userName,
				passw:passw,
				r_passw:r_passw,
				sex:sex,
				file:file,
				personal_profile:personal_profile	

				})
				user.save(function(err,result){
					if(err){
						res.send("注册保存失败");
					}else{   //注册成功之后，直接重定向跳转为登录的首页
						var _user={
							_id:result._id,
							userName:result.userName,
							sex:result.sex,
							file:result.file,
							personal_profile:result.personal_profile
						}
							req.session.user=_user;//.user=result;(自定义：需要保存的东西)
							res.locals.user=req.session.user;
							res.redirect('/');  //重定向回首页
					}

				})
			}

	})
				
})
module.exports=router;