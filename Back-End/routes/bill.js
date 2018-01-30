const Bill = require("../model/bill");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    Bill.find({}, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json(result);
        }
    });
});

router.get("/:id", (req, res) => {
    Bill.findById(req.params.id, (error, result) => {
        if(error){
            res.status(500).json(error);
        }
        else{
            res.json(result);
        }
    });
});

router.post("/create", (req, res) => {
    let newObj = new Bill({
        with : req.body.with,
        with_id : req.body.with_id,
        date : "",
        expense : "",
        total : 0,
        paidby : "",
        notes : "",
        photo : "",
        friend : 0
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

router.post("/new", (req, res) => {

    let image = req.files.photo;
    let date = new Date();
    let imageName = date.getTime() + ".png";

    image.mv("./public/photo/" + imageName, (error) => {
        if(error) return res.status(500).send(error);

        let newObj = new Bill({
            with : req.body.with,
            date : req.body.date,
            expense : req.body.expense,
            total : req.body.total,
            paidby : req.body.paidby,
            notes : req.body.notes,
            photo : "http://localhost:3000/photo/" + imageName,
            friend : req.body.friend
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

router.put("/", (req, res) => {

    // let image = req.files.photo;
    // let imageName = new Date().getTime() + ".png";

    // image.mv("./public/photo/" + imageName, (error) => {
    //     if(error) return res.status(500).send(error);
        
        let newObj = new Bill({
            _id : req.body._id,
            with : req.body.with,
            with_id : req.body.with_id,
            date : req.body.date,
            expense : req.body.expense,
            total : req.body.total,
            paidby : req.body.paidby,
            notes : req.body.notes,
            // photo : "http://localhost:3000/photo/" + imageName,
            user_share : req.body.user_share,
            friend_share : req.body.friend_share,
        });

        Bill.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
            if(error){
                res.status(500).json({ message : "Error updating." });
            }
            else{
                res.json({ message : "Data updated." });
            }
        });
    // });
});

router.delete("/:id", (req, res) => {
    Bill.findByIdAndRemove(req.params.id, (error, result) => {
        if(error){
            res.status(500).send(error);
        }
        else{
            res.json("Data deleted.");
        }
    });
});


module.exports = (function(){
    return router;
})();