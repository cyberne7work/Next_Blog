var express=require("express");
var router=express.Router({mergeParams:true});
var newarticles=require("../models/blog");
var comment=require("../models/blog");

//show page

router.get("/blog/:id",function(req, res) {
    
    newarticles.findById(req.params.id).populate("comments").exec(function(err,foundarticles){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundarticles);
            res.render("blogs/show",{post:foundarticles});
        }
    })
   
});
//edit a post  (form)
router.get("/blog/:id/edit",isLoggedIn,function(req, res) {
    
    newarticles.findById(req.params.id,function(err,id){
        if(err){
            res.redirect("/post");
        }
        else{
            res.render("blogs/edit",{post:id});
        }
    })
    
});
//update post

router.put("/blog/:id",checkBlogOwnership,function(req, res) {
    
    newarticles.findByIdAndUpdate(req.params.id,req.body.post,function(err,id){
        if(err){
            res.redirect("/blog");
        }
        else{
            res.redirect("/blog/"+req.params.id);
        }
    })
    
});

//delet the post
router.delete("/blog/:id",checkBlogOwnership,function(req,res){
    newarticles.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/");
        }
        else{
            res.redirect("/");
        }
    });
});





router.get("/technologies",function(req,res){
    res.render("blogs/technology");
});
router.get("/havefun",function(req,res){
    res.render("blogs/havefun");
});
router.get("/lifeandtravel",function(req,res){
    res.render("blogs/lifeandtravel");
});
router.get("/stories",function(req,res){
    res.render("blogs/stories");
});
router.get("/trendingNews",function(req,res){
    res.render("blogs/trendingstories");
});

//craete new  post
router.post("/",isLoggedIn,function(req,res){
    var image=req.body.image;
     var paragraph=req.body.paragraph;
    var tag=req.body.tag;
    var author={
        id:req.user._id,
        username:req.user.username
    }
    
    var newpost={image:image,paragraph:paragraph,tag:tag,author:author};
    newarticles.create(newpost,function(err,done){
        if(err){
            console.log(err);
        }
        else{
            console.log("Added Sucessfully");
            console.log(done);
             res.redirect("/");
        }
    });
   
});
//post
router.get("/post",isLoggedIn,function(req, res) {
    res.render("blogs/post");
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
};

function checkBlogOwnership(req,res,next){
    if(req.isAuthenticated()){
        newarticles.findById(req.params.id,function(err, foundarticle) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundarticle.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}

module.exports=router;