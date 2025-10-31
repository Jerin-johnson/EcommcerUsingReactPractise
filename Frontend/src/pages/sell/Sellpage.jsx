import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./sellPage.css";
import { addProduct, getProductbyId, updateProduct } from "../../services/productServices";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SellPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const {id} = useParams();

  const navigate = useNavigate();

  useEffect(()=>{
    if(id)
  {
    (async function editPrepopulate(){
      const data = await getProductbyId(id);
      const {title,description,price} = data.data;
      reset({
        title ,
        description,
        price,
      })
      
    })();
  }

  },[id,reset]);



  const onSubmit = async (data) => {
    try {
      console.log("the add of sell page", data);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);

      if (data?.image && data?.image[0]) {
       formData.append("image", data.image[0]);
       }
   

      if(id)
      {
        const response = await updateProduct(formData,id);
        console.log(response);
        toast.success("The product updated successfully")
        navigate("/myproducts");
        return;
      }
      const response = await addProduct(formData);
      console.log(response);
      toast.success("the product added successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("error while adding product");
    }
  };

  return (
    <div className="sell-container">
      <h2 className="sell-title">{id ? "" : "Sell Your Product 🛍️"}</h2>
      <p className="sell-subtitle">{id ? "Edit Product" :" Add a new product listing"}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="sell-form">
        {/* Product Title */}
        <div className="form-group">
          <label>Product Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="error-text">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Write product description..."
            rows="4"
            {...register("description", {
              required: "description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="error-text">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            placeholder="Enter product price"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be greater than 0" },
            })}
          />
          {errors.price && <p className="error-text">{errors.price.message}</p>}
        </div>

        {/* Image Upload */}
       {id ? "" : (<div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && <p className="error-text">{errors.image.message}</p>}
        </div>)} 

        {/* Submit Button */}
        {id ? (<button type="submit" className="sell-btn">
          Edit Product
        </button>) : (<button type="submit" className="sell-btn">
          Add Product
        </button>)}
      </form>
    </div>
  );
};

export default SellPage;
