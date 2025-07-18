import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const { user, cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item._id === product._id);

    if (existingItem) {
      // Increase quantity if product already exists
      return prevCart.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      // Add new product with qty = 1
      return [...prevCart, { ...product, qty: 1 }];
    }
  });
};


  return (
    <div className="product-page">
      <h2 className="product-title">Products</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imgUrl} alt={product.productName} />
            <h3 className="product-name">{product.productName}</h3>
            <p className="product-description">{product.description}</p>
            <h4 className="product-price">${product.price}</h4>
            <button
              className="product-button"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
