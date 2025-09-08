const mongoose = require("mongoose");

const biddingProductSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Product",
    },
    price : {
        type: Number,
        require:true,
    },
});

const biddingProduct = mongoose.model("BiddingProduct", biddingProductSchema);
module.exports = biddingProduct;