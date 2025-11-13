"use client";

import { useContext, useState } from "react";
import { X, Upload } from "lucide-react";
import axios from "axios";

import "./productUploadModal.css";
import { AuthContext } from "../auth/authContext/AuthContext";

const ProductUploadModal = ({ isOpen, onClose }) => {
  const AuthData = useContext(AuthContext);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    imagePreview: null,
  });

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.price || !productData.image) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description || "");
    formData.append("price", productData.price);
    formData.append("image", productData.image);

    try {
      console.log("Uploading product...");

      const response = await axios.post(
        "http://localhost:8010/products/AddProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${AuthData.token}`, // optional
          },
        }
      );

      if (response.data.success) {
        alert("✅ Product added successfully!");
        console.log("Response:", response.data);
        // You can also reset form or close modal
        setProductData({
          name: "",
          description: "",
          price: "",
          image: null,
          imagePreview: null,
        });
        // onClose();
      } else {
        alert(response.data.message || "Failed to add product");
        //reeeeeeeeeffffffffffffreeeeeeeeeeee
        // 2️⃣ If token expired — get new token
        if (response?.data?.code === 403) {
          try {
            console.log("🔁 Access token expired — trying refresh token..." );
            console.log(AuthData.refreshToken)

            const refreshRes = await axios.post(
              "http://localhost:8010/auth/refreshToken",
              {
                token: AuthData.refreshToken, // refresh token stored from login
              }
            );

            const newAccessToken = refreshRes.data.token;

            // ✅ Save new token (depending on how your AuthContext works)
            AuthData.setToken(newAccessToken);

            // 3️⃣ Retry the original request with new token
            const retryResponse = await axios.post(
              "http://localhost:8010/products/AddProduct",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );

            if (retryResponse.data.success) {
              alert("✅ Product added successfully after token refresh!");
              console.log("Response:", retryResponse.data);
              setProductData({
                name: "",
                description: "",
                price: "",
                image: null,
                imagePreview: null,
              });
            } else {
              alert(retryResponse.data.message || "Failed after retry");
            }
          } catch (refreshError) {
            console.error("⚠️ Refresh token failed:", refreshError);
            alert("Session expired. Please login again.");
            // Optionally logout or redirect
            // navigate("/login");
          }
        } else {
          alert(error.response?.data?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert(error.response?.data || "Something went wrong");
    }
  };

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
          <h2>Add New Product</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form className="upload-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
              placeholder="Enter product description"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              step="0.01"
              value={productData.price}
              onChange={(e) =>
                setProductData({ ...productData, price: e.target.value })
              }
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Image *</label>
            <div className="image-upload">
              {productData.imagePreview ? (
                <img
                  src={productData.imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <Upload size={32} />
                  <p>Click to upload</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <button type="submit" className="checkout-btn">
            Upload Product
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductUploadModal;
