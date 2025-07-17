import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Order.css";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h3 className="order-title">My Orders</h3>
      {error && <p className="error-message">{error}</p>}
      {orders &&
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-info">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Order Value:</strong> ${order.orderValue}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.productName}</td>
                    <td>${item.price}</td>
                    <td>{item.qty}</td>
                    <td>${item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
          </div>
        ))}
    </div>
  );
}
