const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: {type: String},
    price:{type:Number,min:0},
    quantity:{type:Number,min:0},
    
   
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product