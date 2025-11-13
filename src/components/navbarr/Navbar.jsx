import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaShoppingBag, FaUser } from "react-icons/fa";
import logo from "../../Assets/logo.png";
import "./styles.css";
import { MdAddChart } from "react-icons/md";
import AuthModal from "../auth/AuthModal";
import ProductUploadModal from "../AddProduct/ProductUploadModal";

export const Navbar = ({ setIsCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [openAddProductModel, setOpenAddProductModel] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollTop = useRef(0);

  const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const { pageYOffset } = window;
      if (pageYOffset > lastScrollTop.current) setIsNavbarVisible(false);
      else setIsNavbarVisible(true);
      lastScrollTop.current = pageYOffset <= 0 ? 0 : pageYOffset;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthModel = () => {
    setOpenAuthModel(!openAuthModel);
  };
  const handleAddProduct = () => {
    setOpenAddProductModel(!openAddProductModel);
  };

  return (
    <>
      <nav className={`navbar ${isNavbarVisible ? "visible" : "hidden"}`}>
        <div>
          <div className="navbar-logo">
            <img src={logo} alt="Jumkas" />
          </div>

          <div className="navbar-left">
            <button
              className="menu-icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="mobile-logo">
              <img src={logo} alt="Jumkas" />
            </div>
          </div>
        </div>

        <div className={`nav-items ${isMenuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="nav-icons">
          <MdAddChart className="icon" onClick={handleAddProduct} />
          <FaUser className="icon" onClick={handleAuthModel} />
          <div className="cart">
            <FaShoppingBag
              onClick={() => setIsCartOpen(true)}
              className="icon"
            />
            <span>(0)</span>
          </div>
        </div>
      </nav>

      {openAuthModel && (
        <AuthModal isOpen={openAuthModel} onClose={handleAuthModel} />
      )}
      {openAddProductModel && (
        <ProductUploadModal isOpen={openAddProductModel} onClose={handleAddProduct} />
      )}
    </>
  );
};

export default Navbar;
