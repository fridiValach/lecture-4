const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    userId:{
        unique:true,
        type:Number, 
        required:true
    },
    emmail:{
        unique:true,
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:7,
        validate: value=>{
            /*
            if (!value.includes("@")||!value.split("@")[1].slice(1).includes(".")||value.split("@").length!==2) throw "Incorrect email address"*/
            const mailformat = /^\w+([\.-]?\w+)*@\w+([\.]?\w+)*(\.\w{2,3})+$/
             if(!value.match(mailformat)) {  throw "Incorrect email address"}
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate: val=>{
            if (!/\d/.test(val)||!val.match(/^.*[!@#$%^&*]{2}/))throw "Incorrect password";
        }
    },
    age:{
        type:Number,
        default:0,
        min:0
    },
    tasks:{
        type:[Number],
        default:[]
    }

})

module.exports = mongoose.model("UsersSchema", UsersSchema);
