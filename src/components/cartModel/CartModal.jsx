"use client";

import { useContext, useEffect, useState } from "react";
import { X, Trash2, Plus, Minus } from "lucide-react";
import img1 from "../../Assets/image1.png";
import "./cartModal.css";
import { AuthContext } from "../auth/authContext/AuthContext";

const CartModal = ({ isOpen, onClose }) => {
  const AuthData = useContext(AuthContext);

  const handleClick = () => {
    console.log("clicked");
    console.log({AuthData});
  };

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Classic Leather Jacket",
      price: 129.99,
      quantity: 1,
      image: "/classic-leather-jacket.png",
    },
    {
      id: 2,
      name: "Cotton T-Shirt",
      price: 39.99,
      quantity: 2,
      image: "/cotton-shirt.png",
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`cart-modal ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Items Container */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-state">
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={img1} alt={item.name} className="item-image" />

                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="item-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="price-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleClick} className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
