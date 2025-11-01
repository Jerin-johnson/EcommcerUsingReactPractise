import React, { useEffect } from 'react';
import "./cart.css";
import {useDispatch,useSelector} from "react-redux"
import { fetchCart, removeFromCart } from '../../slices/cartSlice';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  const dispatch = useDispatch();
  const {items,loading} = useSelector((state)=> state.cart);
  const navigate = useNavigate();

    useEffect(()=>{
      dispatch(fetchCart());
    },[dispatch]);


      function moveToCheckout()
      {
        toast.success("redirect to checkout page")
        navigate("/checkout")
      }

  async function handleRemove(id){
     const confirm = await Swal.fire({
          title: "Are you sure?",
          text: "You won’t be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        });
        if(confirm.isConfirmed)
        {
           const result = await dispatch(removeFromCart(id));
           console.log(result);
           toast.success("removed from cart successfully");
           return;
        }

        toast.error("action not compeleted")

  }

  if(loading) return(<div>Loading...</div>);

  if(items.length === 0) return (<div><h2>Please add product to the cart</h2></div>)

   return (
    <div className="cart-container-product">
      <h2 className="cart-title">🛒 Your Cart</h2>

      <div className="cart-items">
        {items.map((item) => (
          <div className="cart-card" key={item.productId._id}>
            <img
              src={`http://localhost:3000${item.productId.image}`}
              alt={item.productId.title}
              className="cart-img"
            />
        
            <div className="cart-details">
              <h3>{item.productId.title}</h3>
              <p className="cart-price">₹{item.productId.price}</p>
              <button
                className="remove-btn"
                onClick={() => handleRemove(item.productId._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>
          Total Items: <strong>{items.length}</strong>
        </p>
        <p>
          Total Price:{" "}
          <strong>
            ₹
            {items.reduce((acc, item) => acc + item.productId.price, 0)}
          </strong>
        </p>
        <button className="checkout-btn" onClick={moveToCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart
