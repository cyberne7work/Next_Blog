var express=require("express");
var router=express.Router({mergeParams:true});
var newarticles=require("../models/blog");
var User=require("../models/user");
var passport=require("passport");
//show page(home page)

router.get("/",function(req,res){
        console.log(req.user);
        newarticles.find({},function(err,newarticles){
        if(err){
            console.log(err);
            
        }
        else
        {
            res.render("blogs/home",{article:newarticles, currentUser:req.user});
        }
    })
    
});
//logout

router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});
//signin get
router.get("/login",function(req, res) {
    res.render("blogs/login");
})
//signin post
router.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
    }),function(req, res) {}
);
//signup get
router.get("/register",function(req, res) {
    res.render("blogs/signup");
})

//signup post
router.post("/register",function(req, res) {
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("blogs/signup");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            })
        }
    })
});

//middleware

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports=router;