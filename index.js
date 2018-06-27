var express=require("express");
var index=express();
var bodyParser=require("body-parser");
var methodoverride=require("method-override");
var mongoose = require('mongoose');
var newarticles=require("./models/blog");
var comment = require("./models/comment");
var User = require("./models/user");
var seedDb=require("./seeds");
var passport=require("passport");
var LocalStrategy=require("passport-local");

var commentRoutes=require("./routes/comment");
var blogRoutes=require("./routes/blog");
var indexRoutes=require("./routes/index");

//this will seed the data base

// seedDb();

//Passport Config;
index.use(require("express-session")({
    secret:"i am making a great company",
    resave:false,
    saveUninitialized:false
    
    
    
}));
//import for passport js

index.use(passport.initialize());
index.use(passport.session());

//user seriallize
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://next:vishalnext25@ds219191.mlab.com:19191/vishalnextpersonal');


index.use(bodyParser.urlencoded({extended:true}));
index.use(methodoverride("_method"));
index.use(express.static("public"));
index.set("view engine","ejs");

//scema setup

// var articleSchema=new mongoose.Schema({
//     image:String,
//     paragraph:String,
//     tag:String
// });

// var newarticles=mongoose.model("articles",articleSchema);



//avail currentuser to all route

index.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

index.use(indexRoutes);
index.use(commentRoutes);
index.use(blogRoutes);


index.listen(process.env.PORT,process.env.ID,function(req,res){
    console.log("Server is started");
})