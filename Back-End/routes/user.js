const User = require("../model/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {

    let image = req.files.profile;
    let date = new Date();
    let imageName = date.getTime() + ".png";

    image.mv("./public/profile/" + imageName, (error) => {
        if(error) return res.status(500).send(error);

        let newObj = new User({
            username : req.body.username,
            password : req.body.password,
            profile : "http://localhost:3000/profile/" + imageName
        });
    
        newObj.save((error) => {
            if(error){
                res.status(500).send(error);
            }
            else{
                res.json(newObj);
            }
        });
    });
});

router.post("/login", (req, res) => {

    User.findOne({ name : req.body.username, password : req.body.password }, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({ message : "User not found." })
        }
        else{
            const payload = {
                id : result._id,
                name : result.username
            };

            const token = jwt.sign(payload, "secretkey");

            res.json({ token : token });
        }
    });
});

router.get("/", (req, res) => {
    User.find({}, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json(result)
        }
    });
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json(result)
        }
    });
});

router.post("/loadme", (req, res) => {

    User.findOne({ name : req.body.username, password : req.body.password }, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else if(!result){
            res.status(404).json({ message : "User not found." })
        }
        else{
            res.json(result);
        }
    });
});

module.exports = (function(){
    return router;
})();