import Product from "../models/productModel.js";





export const addProduct = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if(!req.file)
    {
      throw new Error("image is required")
    }

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      title,
      description,
      price,
      image,
      sellerId: req.user._id,
    });

    await newProduct.save();
    return res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;
    console.log("hai hello from updateProduct")

    const updateData = { title, description, price };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchProduct = async(req,res)=>{
  try {
    console.log("hai helloe form fetch product");
    const products = await Product.find({isSold:false}).sort({ createdAt: -1 });
    res.json({ success: true, products });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching products" }); 
  }
}

export const getProductbyId = async (req,res)=>{
    try {
        const {id} = req.params;
        if(!id) return res.status(404).json({success:false,message:"invalid product id"});

        const product = await Product.findById(id);
        if(!product) return res.status(500).json({success:false,message:"Error occcured while fetching the product"});

        return res.status(200).json({success:true,message:"product fetched successfully",data :product});
    } catch (error) {
        console.log(error);
         res.status(500).json({ success: false, message: error.message });
    }
}



export const getUserProducts = async (req,res)=>{
  try {
     console.log("hai")
    let userId = req?.user?._id;
    console.log(req.user);
    console.log("hai")

    if(!userId) throw new Error("UserId need for further action");

    const userProduct = await Product.find({sellerId:userId}).sort({createdAt:-1});
    if(!userProduct)
    {
      throw new Error("The user Does not has any product");
    }

    return res.status(200).json({success:true,message:"product fecthed successfully",data:userProduct});
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({success:false,message:error.message});
    
  }
}


export const deleteProduct = async (req,res)=>{
  try {
    const {id} = req.params;
    if(!id) throw new Error("Invalid call");

    await Product.findByIdAndDelete(id);

    return res.status(200).json({success:true,message:"Product deleted succcessfully"});
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Something went wrong"});
  }
}