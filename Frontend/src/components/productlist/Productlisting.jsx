import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { fetchProducts } from '../../services/productServices';
import "./productlisting.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { toast } from 'react-toastify';


const Productlisting = () => {
    const [products,setProducts] = useState();
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect( ()=>{

     async function fetch(){
      try {
        setLoading(true);
         const data = await fetchProducts();
         console.log(data?.products);
         setProducts(data.products);
         console.log("This is working to check")
         setLoading(false);
        
      } catch (error) {
        console.log(error);
        setError("Failed to fetch product")
      }
      }

      fetch()
    

    },[]);

    if (loading) return <p>Loading products...</p>;

    if (error) return <p>{error}</p>;
    
  return (
       <div className="product-list">
        {products.map((product) => (
        <div className="product-card" key={product._id}>
          <img src={`http://localhost:3000${product.image}`} alt={product.title} />
          <h3>{product.title}</h3>
          <p>₹{product.price}</p>
          <button>View Details</button>
          <button onClick={()=>{
            dispatch(addToCart(product._id))
            .unwrap()
            .then(() => toast.success("Added to cart"))
            .catch(err => toast.error(err));
          }}>Add to cart</button>
        </div>
      ))}

      
      
    </div>
  )
}


export default Productlisting
