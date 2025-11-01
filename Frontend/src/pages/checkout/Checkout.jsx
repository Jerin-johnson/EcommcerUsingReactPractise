import { useDispatch, useSelector } from "react-redux";
import "./checkout.css";



import React from 'react'
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import { clearCart } from "../../slices/cartSlice";
const API_URL = "http://localhost:3000/api/product";

const Checkout = () => {

    const {items} = useSelector((state)=> state.cart);
 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const totalAmount = items.reduce((acc,cur)=> acc+=cur.productId.price,0);

   async function handleCheckout(){
       try {
        const cartItems = items.map((item)=> item.productId._id);
        const response = await axios.post(`${API_URL}/checkout`,{cartItems},{
            withCredentials:true
        });
        console.log("Is this has any issues")
        console.log(response);
        toast.success("Purchased successfully...redirecting");
        dispatch(clearCart());
        setTimeout(() => navigate("/"), 1500);
        
       } catch (error) {
        console.log(error);
        toast.error("failed to purchase the product");
       }
    }

    return (
    <div className="checkout-container">
      <h2 className="checkout-title">💳 Checkout</h2>

      <div className="checkout-content">
        {/* LEFT - Items Summary */}
        <div className="checkout-items">
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div key={item.productId._id} className="checkout-item">
              <img
                src={`http://localhost:3000${item.productId.image}`}
                alt={item.productId.title}
                className="checkout-item-img"
              />
              <div className="checkout-item-info">
                <p className="checkout-item-title">{item.productId.title}</p>
                <p className="checkout-item-price">₹{item.productId.price}</p>
              </div>
            </div>
          ))}
          {items.length === 0 && <p>Your cart is empty 🛒</p>}
        </div>

        {/* RIGHT - Summary and Actions */}
        <div className="checkout-summary">
          <h3>Payment Summary</h3>
          <div className="summary-row">
            <span>Items:</span>
            <span>{items.length}</span>
          </div>
          <div className="summary-row">
            <span>Total:</span>
            <strong>₹{totalAmount}</strong>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Confirm & Checkout
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default Checkout
