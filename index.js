var express=require("express");
var app=express();
var router=require("./routers");
var path=require("path");
var bodyParser=require("body-parser");

var session=require('express-session');  //session插件，用这个安装要在小黑窗安装：npm i express-session --save

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.set("views",path.join(__dirname,"views"));//'views'：是一个路径
app.set("view engine","ejs");//'ejs' 路径下的ejs页面

//在app中配置session
app.use(session({secret:'Li'}));   //secret:'Li':是session的密码（自己配置）
router(app);
app.listen(80,function(){
	console.log("服务已启动...");
});