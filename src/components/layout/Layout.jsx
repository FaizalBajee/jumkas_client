import React, { useState } from "react";
import Navbar from "../navbarr/Navbar";
import Footer from "../../footer/Footer";
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import './Layout.css';
import CartModal from "../cartModel/CartModal";

const Overlay = ({ isOpen, setIsOpen }) => (
  <div
    onClick={() => setIsOpen(false)}
    className={`overlay ${isOpen ? "open" : ""}`}
  />
);



const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  const navIcons = [
    { icon: FaSearch, onClick: () => alert("Search clicked"), title: "Search" },
    { icon: FaUser, onClick: () => alert("Profile clicked"), title: "User" },
    {
      icon: FaShoppingBag,
      onClick: () => alert("Cart clicked"),
      badge: 2,
      title: "Cart",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar logoSrc="/logo.png" navLinks={navLinks} navIcons={navIcons} setIsCartOpen={setIsOpen} />
      <Overlay isOpen={isOpen} setIsOpen={setIsOpen} />
      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
