import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import './Header.css'; // External CSS

export default function Header() {
  const { user, cart } = useContext(AppContext);

  // Calculate total cart item quantity
  const cartCount = cart?.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="header">
      <div className="nav-container">
        <h1 className="logo">MERN Frontend</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">
            MyCart
            {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
          </Link>
          <Link to="/order">MyOrder</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          {user?.token ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
        {user?.firstName && (
          <div className="welcome-text">Hello, {user.firstName}</div>
        )}
      </div>
    </header>
  );
}
