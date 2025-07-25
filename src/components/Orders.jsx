import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("Pending");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Order Management</h2>

      <div>
        <select defaultValue="Pending" onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {orders.map((order) => (
          <li key={order._id} style={{ marginBottom: "20px" }}>
            <strong>Order ID:</strong> {order._id} <br />
            <strong>Order Value:</strong> ₹{order.orderValue} <br />
            <strong>Status:</strong> {order.status} <br />

            <strong>Products:</strong>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.productName} (₹{item.price} × {item.qty})
                </li>
              ))}
            </ul>

            {order.status === "Pending" && (
              <>
                <button onClick={() => updateOrder("cancelled", order._id)}>Cancel</button>{" "}
                <button onClick={() => updateOrder("completed", order._id)}>Complete</button>
              </>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
