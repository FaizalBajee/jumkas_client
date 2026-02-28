
import "../Product.css";
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

export default ShopModel;