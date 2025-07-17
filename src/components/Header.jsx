import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
import './Header.css'; // External CSS

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <header className="header">
      <div className="nav-container">
        <h1 className="logo">MERN Frontend</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/cart">MyCart</Link>
          <Link to="/order">MyOrder</Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
          {user?.token ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
