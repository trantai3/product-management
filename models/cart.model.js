const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema(
    {
        user_id: String,
        products: [
            {
                product_id: String,
                quantity: Number
            }            
        ]
    }, 
    { 
        timestamps: true 
    }
)

const Cart = mongoose.model("Cart", cartSchema, "carts")  // 1: name module 3: collection

module.exports = Cart