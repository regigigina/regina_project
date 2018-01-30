const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/splitbill", { useMongoClient : true });

const Schema = mongoose.Schema;

const billSchema = new Schema({
    with : String,
    with_id : String,
    date : String,
    expense : String,
    total : Number,
    paidby : String,
    notes : String,
    // photo : String,
    user_share : Number,
    friend_share : Number
});

const Bill = mongoose.model("bill", billSchema);

module.exports = Bill;