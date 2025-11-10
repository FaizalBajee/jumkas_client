import React, { useState } from "react";
import "./Product.css";
import Section from "../../common/Section";
import img1 from "../../Assets/image1.png";
import img2 from "../../Assets/image2.png";
import img3 from "../../Assets/image3.png";
import img4 from "../../Assets/image3.png";
import img5 from "../../Assets/image2.png";
import img6 from "../../Assets/image1.png";
import img7 from "../../Assets/image2.png";
import img8 from "../../Assets/image3.png";

const Card = ({ title, img, price, des, onQuickShop }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonHovering, setIsButtonHovering] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="image-container">
        <img
          src={img || "/placeholder.svg"}
          alt={title}
          className={`product-image ${isHovering ? "zoom" : ""}`}
        />
        {/* Quick Shop button only appears on hover */}
        {isHovering && (
          <button
            className={`quick-shop-btn ${isButtonHovering ? "filling" : ""}`}
            onMouseEnter={() => setIsButtonHovering(true)}
            onMouseLeave={() => setIsButtonHovering(false)}
            onClick={() => onQuickShop({ title, img, price })}
          >
            <span className="btn-fill"></span>
            <span className="btn-text">+ QuickShop</span>
          </button>
        )}
      </div>

      <div className="product-info">
        <h1 className="product-title">{title}</h1>
        <p className="product-price">{price}</p>
        {/* {des && <p className="product-description">{des}</p>} */}
      </div>
    </div>
  );
};
const Modal = ({ isOpen, onClose, title, children, width = "400px" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

const ShopModel = ({ closeModal, selectedProduct }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeModal}>
          &times;
        </button>
        <img
          src={selectedProduct.img}
          alt={selectedProduct.title}
          className="modal-image"
        />
        <h2>{selectedProduct.title}</h2>
        <p className="modal-price">{selectedProduct.price}</p>

        <div className="quantity-container">
          <label>Quantity:</label>
          <input type="number" min="1" defaultValue="1" />
        </div>

        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleQuickShop = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => setSelectedProduct(null);

  const products = [
    {
      id: 1,
      title: "Golden Jumkas",
      img: img1,
      price: "$19.99",
      des: "Elegant handcrafted golden jumkas for festive occasions.",
    },
    {
      id: 2,
      title: "Silver Studs",
      img: img2,
      price: "$14.49",
      des: "Minimal silver studs perfect for daily wear.",
    },
    {
      id: 3,
      title: "Pearl Earrings",
      img: img3,
      price: "$24.99",
      des: "Classic pearl earrings that never go out of style.",
    },
    {
      id: 4,
      title: "Diamond Hoops",
      img: img4,
      price: "$39.99",
      des: "Sparkling diamond hoop earrings for special occasions.",
    },
    {
      id: 5,
      title: "Traditional Chandbali",
      img: img5,
      price: "$29.99",
      des: "Traditional Indian chandbali earrings with intricate design.",
    },
    {
      id: 6,
      title: "Rose Gold Drops",
      img: img6,
      price: "$17.99",
      des: "Delicate rose gold drop earrings with a modern look.",
    },
    {
      id: 7,
      title: "Boho Feather Earrings",
      img: img7,
      price: "$12.49",
      des: "Trendy bohemian feather earrings for a casual vibe.",
    },
    {
      id: 8,
      title: "Crystal Studs",
      img: img8,
      price: "$9.99",
      des: "Simple and elegant crystal studs that match any outfit.",
    },
  ];

  return (
    <Section id="products">
      <div className="product">
        <h1 className="header">Featured Products</h1>
        <div className="product-grid">
          {products.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              img={product.img}
              price={product.price}
              des={product.des}
              onQuickShop={handleQuickShop}
            />
          ))}
          {/* 🟩 Add this Modal block */}
          {selectedProduct && (
            <ShopModel
              selectedProduct={selectedProduct}
              closeModal={closeModal}
            />
          )}
        </div>
      </div>
    </Section>
  );
}
