var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");

var UserModel = require("./UserModel.js");
var ActivityModel = require("./ActivityModel");



//MIDDLEWARE: To ensure requester is logged in.
var isUserAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).send();
    }
};



// ------------------------------------------------ //
// ------------------- activities ----------------- //
// ------------------------------------------------ //

//GET ALL activityS WITHOUT USERS
router.get("/activity", function(req, res, next){ 
    var currentDate = new Date().toISOString()
    ActivityModel.find().where('date').gt(currentDate).sort('date').exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

router.get("/activity/filter/:filter", function(req, res, next){ 
    ActivityModel.find({$text: {$search: req.params.filter}}).select("-users").exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

//GET ONE activity AND ALL USERS
router.get("/activity/:id", function(req, res, next){
    ActivityModel.findById(req.params.id).populate("users.user").exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

//UPDATE / EDIT ONE activity
router.put("/activity/:id", isUserAuthenticated,  function(req, res, next){
    console.log(req.body);
    console.log(req.user);

    ActivityModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).populate("tracks.track").exec( function(err, activityModel){
        if(err) next(err);

        if(activityModel === null){ 
            res.status(401).send();
        }
        res.send(ActivityModel);
    });
});

//POST A NEW activity
router.post("/activity", isUserAuthenticated, function(req, res, next){
    
    console.log(req.body);
    req.body.createdBy = req.user.username;
    
    var activity = new ActivityModel(req.body);
    
    activity.save(function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

//DELETE A activity
router.delete("/activity/:id", isUserAuthenticated, function(req, res, next){
    
    ActivityModel.findByIdAndRemove(req.params.id, function(err, data){
        if(err) next(err);
        res.end();
    })
})

// ------------------------------------------------ //
// ------------------- AUTHORIZATION -------------- //
// ------------------------------------------------ //

router.post('/user', function(req, res, next) {

    if(req.body.action === "login"){

        passport.authenticate('local', function(err, user, info) {
            if (err) return next(err);
            if (!user) return res.status(401).end();

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                    return res.send(user);
            });

        })(req, res, next);

    } else if(req.body.action === "create"){
        console.log("Creating user:");
        console.log(req.body);

        var userModel = new UserModel(req.body);
        userModel.save(function(err, user){
            if(err) next(err);
            req.login(user, function(err){
                if(err) return next(err);
                res.send(user);

            });
        })
    }

});

router.get("/user", function(req, res, next){
    if(req.isAuthenticated()){
        res.send(req.user);
    } else {
        res.status(200).send({});
    }
})

router.delete("/user", function(req, res, next){

    req.session.destroy(function (err) {
        res.status(200).send(); //Inside a callback… bulletproof!
    });
})

module.exports = router;
