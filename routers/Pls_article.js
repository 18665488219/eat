var express=require("express");
var router=express.Router();

var checknotlogin=require('./check.js').checknotlogin;
var userschema=require('../schemar/user.js');
var articleSchema=require("../schemar/article.js");
var msgSchema=require("../schemar/msgs.js");
function addZero(num){
	if(num >=0 && num <10){
		return "0" +num;
	}else{
		return "" + num;
	}
}
function Time(oDate){
	var year=(oDate.getFullYear()).toString(),
		month=addZero((oDate.getMonth()+1).toString()),
		day=addZero((oDate.getDate()).toString()),
		hour=addZero((oDate.getHours().toString())),
		minute=addZero((oDate.getMinutes().toString())),
		second=addZero((oDate.getSeconds().toString()));
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

}
	// console.log(oDate.getTime());

router.get('/',checknotlogin,function(req,res){
	// res.render('shouye');
	res.locals.user = req.session.user;
	// console.log('***',req.session.user);
	res.render("Pls_article");
})

router.post('/save',function(req,res){
	// console.log(req.body.title + '--' + req.body.content + '--' +req.body._id);  //打印标题、内容和id出来

	userschema.findById(req.body._id,function(err,result){
		// console.log('+++',result)
		var obj={  //获取作者的所有信息
			_id:result._id+"",
			userName:result.userName,
			sex:result.sex,
			file:result.file,
			personal_profile:result.personal_profile
		}
		var asch=new articleSchema({  //把数据从数据库提取出来
			title:req.body.title,
			content:req.body.content,
			time:Time(new Date()),
			author:obj,
			pv:0,
			leave:0
		})

		asch.save(function(err,result){  //保存发表文章
			// res.send('文章发表成功');
			res.redirect('/info/'+result._id);
		})
	})
})

router.post('/savemsg',function(req,res){  //保存留言内容
	var uid=req.body.m_id;     //m_id：根据登录的人的id查找
	// console.log("56556++++++"+uid);

	userschema.findById(uid,function(err,userresult){
		var u_obj={   //声明一个变量，获取发表文章作者的有关信息
			_id:userresult._id,
			userName:userresult.userName,
			file:userresult.file
		}
		var msg=new msgSchema({  //声明一个msgSchema，然后获取msgs.js里面表的数据
			author:u_obj,
			content:req.body.msg,
			time:Time(new Date()),
			msg_id:req.body.d_id    //m_id：登录的人的id赋给留言的id

		})
		msg.save(function(err){
			console.log('+++++',req.body.d_id)    //登录的人的id
			res.redirect('/info/'+req.body.d_id);
		})
	})
})

router.get('/delmsg',function(req,res){  //删除文章详情自己留言的内容
	var mid=req.query.mid;
	msgSchema.findByIdAndRemove(mid,function(err){
		res.send('0');
	})
})

router.get('/article_update/:d_id',function(req,res){  //登录状态下，在首页点击编辑按钮可修改已发布的文章的标题和内容
	res.locals.user=req.session.user;
	var d_id=req.params.d_id;
	articleSchema.findById(d_id,function(err,result){
		res.render('article_update',{up:result});
	})
})
router.post('/at_update_save',function(req,res){//登录状态下，保存修改的文章的内容并渲染在页面上
	var d_id=req.body.d_id;
	articleSchema.findByIdAndUpdate(d_id,{$set:{title:req.body.title,content:req.body.content}},function(err,result){
		res.redirect('/info/'+ d_id);
	})
})
module.exports=router;

