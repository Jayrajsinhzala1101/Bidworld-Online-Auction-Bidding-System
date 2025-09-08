const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
        user:{
            type:mongoose.Schema.ObjectId,
            require:true,
            ref:"User",
        },
        title:{
            type:String,
            require:[true,"Please add a title"],
            trime:true,
        },
        slug:{
            type:String,
            unique:true,
        },
        description:{
            type:String,
            require:[true,"Please add a description"],
            trime:true,
        },
        image:{
            type:Object,
            default:{},
        },
        category:{
            type:String,
            require:[true,"Please add a category"],
            default:"All",
        },
        commission:{
            type:Number,
            default:0,
        },
        price:{
            type:Number,
            require:[true,"Please add a price"],
        },
        height:{
            type:Number,
        },
        lengthPic:{
            type:Number,
        },
        width:{
            type:Number,
        },
        mediumused:{
            type:String,
        },
        weight:{
            type:Number,
        },
        isVerify:{
            type:Boolean,
            default:false,
        },
        verificationTime: {
            type: Date,
            default: null
        },
        isSoldout:{
            type:Boolean,
            default:false,
        },
        isEnded: {
            type: Boolean,
            default: false
        },
        soldTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        endTime: {
            type: Date,
            default: null
        }
    });

    
const Product = mongoose.model("Product",productSchema);
module.exports = Product;