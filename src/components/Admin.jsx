import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Admin() {
  const navStyle = {
    backgroundColor: "#f0f0f0",
    padding: "10px",
    marginBottom: "20px",
    display: "flex",
    gap: "15px",
    fontFamily: "Arial, sans-serif",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#0077cc",
    fontWeight: "bold",
  };

  const outletStyle = {
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
  };

  return (
    <div>
      <nav style={navStyle}>
        <Link to="/admin" style={linkStyle}>Users</Link>
        <Link to="/admin/products" style={linkStyle}>Products</Link>
        <Link to="/admin/orders" style={linkStyle}>Orders</Link>
      </nav>
      <div style={outletStyle}>
        <Outlet />
      </div>
    </div>
  );
}
