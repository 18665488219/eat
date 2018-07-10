var userschema=require('../schemar/user.js');
var articleSchema=require("../schemar/article.js");
var msgSchema=require("../schemar/msgs.js");

module.exports=function(app){
	app.use('/login',require('./login'));
	app.use('/reg',require('./reg'));  
	 //'/reg：是所有的请求   //"./reg"：是注册页面
	app.use('/Pls_article',require('./Pls_article'));
	 
app.get("/",function(req,res){
	res.header('Access-Control-Allow-Origin','*');
	if(! req.session.user){
		req.session.user="";
	}
		res.locals.user=req.session.user;
		articleSchema.find({},function(err,result){  //返回这个人发表文章的所有结果
			res.render('shouye',{as:result});
			// res.send("5665");
		})
		
	});

	app.get('/shouye',function(req,res){  //用axios获取数据，然后要解决跨域问题
		res.header('Access-Control-Allow-Origin','*');

		if(!req.session.user){
			req.session.user="";
		}
		res.locals.user = req.session.user;
		articleSchema.find({},function(err,result){
			//console.log(result)
			res.json({as:result})
		})	
	})
app.get('/exit',function(req,res){  //点击退出按钮，重定向回首页
		req.session.user=null;
		res.locals.user = req.session.user;
		res.redirect("/");
})
app.get('/shou/:_id',function(req,res){  //首页通过id查找，然后将发表的文章返回到渲染到页面上
	res.locals.user=req.session.user;
	var i_id=req.params._id;
	articleSchema.find({'author._id':i_id},function(err,result){
		res.render('shouye',{as:result});
		// console.log(locals.user._id == as[i].author.m_id);
	})
})
app.get('/info/:d_id',function(req,res){   //通过查找id把个人主页的一些信息渲染到页面上
		res.locals.user=req.session.user;
		var d_id=req.params.d_id;   //d_id：是发表文章的id

		articleSchema.findById(d_id,function(err,result){ 
			// console.log('*-*re--',d_id)
			msgSchema.find({msg_id:d_id},function(err,msgresult){  //msg_id:是留言的id（d_id：是发表文章的id）
				//浏览量每次点击金页面的时候结果+1和留言有多少个
				articleSchema.findByIdAndUpdate(d_id,{$set:{pv:result.pv+1,leave:msgresult.length
				}},function(err,re){
					articleSchema.findById(d_id,function(err,result1){   //返回新添加时留言和浏览的次数的结果
						res.render('details_page',{details:result1,msgs:msgresult});
					})
					
				})
			})
		})
	})
app.get('/deld',function(req,res){  //登录之后，跳转到首页，然后点击三角按钮的下拉框，点击删除，把点击的文章删除掉
	var d_id=req.query.d_id;
	articleSchema.findByIdAndRemove(d_id,function(err,result){
		msgSchema.remove({msg_id:d_id},function(err){   //d_id:是文章的id
			articleSchema.findById(d_id,function(err,result1){
				res.send("0");
			})
		})
	})
})
} 