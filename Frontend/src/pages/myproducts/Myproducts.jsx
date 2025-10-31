import { deleteProductById, fetchUserProduct } from "../../services/productServices";
import "./myproduct.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const Myproducts = () => {
  const [userProduct,setUserProduct] = useState(null);
  const [loading,setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(()=>{
    const fetch = async()=>{
      const data = await fetchUserProduct();
      setUserProduct(data.data);
      setLoading(false);
    }

    
    fetch();

  },[]);

  function handleEdit(id){
    navigate(`/sell/${id}`);
  }


  async function handleDelete(id){
     const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });


    if(confirm.isConfirmed)
    {
      try {
        await deleteProductById(id);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
        const data = await fetchUserProduct();
        setUserProduct(data.data);
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  if(loading)
  {
    return (<div>Loading....please be patient</div>)
  }

  if(!userProduct)
  {
    return (<div>Please add products</div>)
  }


   return (
    <div className="my-products-container">
      <h2 className="my-products-title">My Products</h2>

      <div className="my-products-grid">
        {userProduct.length === 0 ? (
          <p>No products listed yet.</p>
        ) : (
          userProduct.map((product) => (
            <div key={product._id} className="my-product-card">
              <img
                src={`http://localhost:3000${product.image}`}
                alt={product.title}
                className="my-product-image"
              />
              <div className="my-product-details">
                <h3 className="my-product-title">{product.title}</h3>
                <p className="my-product-description">{product.description}</p>
                <p className="my-product-price">₹{product.price}</p>
              </div>
              <div className="my-product-actions">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="btn-edit"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn-delete"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};




export default Myproducts
