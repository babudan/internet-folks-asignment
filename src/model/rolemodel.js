const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema( 
    {
       name : {
        type : String,
        required : true,
        default : "Community Admin",
        enum : ["Community Admin" ,"Community Moderator" ,"Community Member"]
       } ,
       content : {
       meta : {
        total : String,
        pages : String,
        page : String
       }
    }
    },
    { timestamps: true }
);

module.exports = mongoose.model("role", roleSchema);