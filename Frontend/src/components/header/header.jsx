import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import "./header.css"; // 👈 import CSS file
import { logoutUser } from "../../services/authServices";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = async () => {
    const res = await logoutUser()
    console.log(res);
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">

      <Link to="/" className="logo">
        🛒 MyShop
      </Link>

      {/* Navigation Links */}
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/sell" className="nav-link">Sell</Link>
        <Link to="/products" className="nav-link">Products</Link>

        <div className="cart-container">
          <Link to="/cart" className="nav-link">Cart</Link>
          {/* {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )} */}
        </div>

        {/* Auth Buttons */}
        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout ({user?.username || "User"})
          </button>
        ) : (
          <Link to="/register" className="login-btn">
            register
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
