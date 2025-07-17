import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css"; 
export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty - 1 } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([])
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="cart-container">
  <h2 className="cart-title">My Cart</h2>
  {error && <div className="cart-error">{error}</div>}
  <ul className="cart-list">
    {cart &&
      cart.map(
        (value) =>
          value.qty > 0 && (
            <li className="cart-item" key={value._id}>
              <span>{value.productName}</span>
              <span>₹{value.price}</span>
              <div className="qty-controls">
                <button className="qty-button" onClick={() => decrement(value._id, value.qty)}>-</button>
                {value.qty}
                <button className="qty-button" onClick={() => increment(value._id, value.qty)}>+</button>
              </div>
              <span>₹{value.price * value.qty}</span>
            </li>
          )
      )}
  </ul>
  <div className="order-summary">Order Value: ₹{orderValue}</div>
  <p>
    {user?.token ? (
      <button className="order-button" onClick={placeOrder}>Place Order</button>
    ) : (
      <button className="order-button" onClick={() => Navigate("/login")}>Login to Order</button>
    )}
  </p>
</div>
  );
}
