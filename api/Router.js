var mongoose = require("mongoose");
var router = require("express").Router();
var passport = require("passport");

var UserModel = require("./UserModel.js");
var TrackModel = require("./TrackModel");
var TracklistModel = require("./TracklistModel");



//MIDDLEWARE: To ensure requester is logged in.
var isUserAuthenticated = function (req, res, next) {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).send();
    }
};

// ------------------------------------------------ //
// ------------------- TRACKS --------------------- //
// ------------------------------------------------ //
router.get("/track", function(req, res, next){
    TrackModel.find().exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

//GET ONE TRACK AND FEATURED IN.
router.get("/track/:id", function(req, res, next){
    TrackModel.findById(req.params.id).exec( function(err, data){
        if(err) next(err);
        if(!data) return res.status(404).send();

        TracklistModel.find({"tracks.track": req.params.id}).select("-tracks").exec(function(err, data2){
            if(err) next(err);
            data = data.toJSON();
            //data2 = data2.toJSON();
            data["featuredIn"] = data2.map(function(item){
                return item.toJSON();
            });
            console.log(data);
            res.send(data);
        });
    });
});

router.put("/track/:id", function(req, res, next){
    console.log(req.body);

    TrackModel.findByIdAndUpdate(req.params.id, req.body).exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

router.post("/track", isUserAuthenticated, function(req, res, next){
  

    console.log(req.body);
    req.body.createdBy = req.user.username;
    
    var track = new TrackModel(req.body);
    
    track.save(function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

router.delete("/track/:id", isUserAuthenticated, function(req, res, next){
    TrackModel.findByIdAndRemove(req.params.id, function(err, data){
        if(err) next(err);
        res.end();
    })
})

// ------------------------------------------------ //
// ------------------- TRACKLISTS ----------------- //
// ------------------------------------------------ //

//GET ALL TRACKLISTS WITHOUT TRACKS
router.get("/tracklist", function(req, res, next){ 
    TracklistModel.find().select("-tracks").exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

router.get("/tracklist/filter/:filter", function(req, res, next){ 
    TracklistModel.find({$text: {$search: req.params.filter}}).select("-tracks").exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

//GET ONE TRACKLIST AND ALL TRACKS
router.get("/tracklist/:id", function(req, res, next){
    TracklistModel.findById(req.params.id).populate("tracks.track").exec( function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

//UPDATE / EDIT ONE TRACKLIST
router.put("/tracklist/:id", isUserAuthenticated,  function(req, res, next){
    console.log(req.body);
    console.log(req.user);

    TracklistModel.findOneAndUpdate({_id: req.params.id, createdBy: req.user.username}, req.body, {new: true}).populate("tracks.track").exec( function(err, tracklistModel){
        if(err) next(err);

        if(tracklistModel === null){ //Couldn't find a matching _id and createdby. probably user doesnt have rights to edit this tracklist.
            res.status(401).send();
        }
        res.send(tracklistModel);
    });
});

//POST A NEW TRACKLIST
router.post("/tracklist", isUserAuthenticated, function(req, res, next){
    
    console.log(req.body);
    req.body.createdBy = req.user.username;
    
    var tracklist = new TracklistModel(req.body);
    
    tracklist.save(function(err, data){
        if(err) next(err);
        res.send(data);
    })
})

//DELETE A TRACKLIST
router.delete("/tracklist/:id", isUserAuthenticated, function(req, res, next){
    
    TracklistModel.findByIdAndRemove(req.params.id, function(err, data){
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
