import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!userId || !id) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "The product does not exist" });
    }

    if (product.sellerId.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ success: false, message: "Seller and buyer cannot be the same person" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existProduct = cart.items.find(
      (item) => item.productId.toString() === id.toString()
    );

    if (existProduct) {
      return res
        .status(400)
        .json({ success: false, message: "This item already exists in your cart" });
    }

    cart.items.push({productId: id });
    await cart.save();

    return res
      .status(200)
      .json({ success: true, message: "Product added to cart successfully", data :cart?.items });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error while adding to cart" });
  }
};




export const deleteFromCart = async (req,res)=>{
    try {
      console.log("is delete cart get called check")
        const {id} = req?.params;
        const userId = req.user._id;
     if(!id || !userId) return res.status(400).json({success:false,message:"bad request"});

     const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(400).json({ success: false, message: "No items in the cart" });
    }

    
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === id.toString()
    );

    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

   
    cart.items.splice(productIndex, 1);

    
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while removing item from cart",
    });
  }
};




export const fetchUserCartItems = async(req,res)=>{
    try {
      console.log("This fetch user cart page")
        const userId = req.user?._id;

        if(!userId) return res.status(400).json({success:false,message:"Bad request"});
        console.log("Is this also called")

        const userCart = await Cart.findOne({userId}).populate("items.productId");

        if(!userCart || userCart.items.length === 0) return res.status(404).json({success:false,message:"There is no items in the cart"});

        return res.status(200).json({success:true,message:"The user cart fetched successfully",data:userCart.items});
        
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({success:false,message:error.message});
        
    }
}