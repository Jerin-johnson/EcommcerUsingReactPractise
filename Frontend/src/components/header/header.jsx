import React, {  useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import "./header.css"; // 👈 import CSS file
import { logoutUser } from "../../services/authServices";
import { fetchCart } from "../../slices/cartSlice";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const {items,isfetched,loading} = useSelector((state) => state.cart);


  useEffect(() => {

   if (isAuthenticated && !isfetched && !loading) {
      dispatch(fetchCart());
    }
  
}, [dispatch, isAuthenticated,isfetched,loading]);

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
        <Link to="/myproducts" className="nav-link">MyProducts</Link>

        <div className="cart-container">
          <Link to="/cart" className="nav-link">Cart</Link>
          {isfetched && items.length > 0 && (
      <span className="cart-badge">{items.length}</span>
    )}
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
