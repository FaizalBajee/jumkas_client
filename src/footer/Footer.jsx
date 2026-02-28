import React from "react";
import "./Footer.css";
import Section from "../common/Section";

const Footer = () => {
  return (
    <Section  id="footer">

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>About Us</h3>
            <p style={{width:"200px"}}>
              Welcome to My Website — Your trusted source 
              for quality content and services.
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>
              <i className="fas fa-envelope"></i> support@mywebsite.com
            </p>
            <p>
              <i className="fas fa-phone"></i> +91 98765 43210
            </p>
            <p>
              <i className="fas fa-location-dot"></i> Chennai, India
            </p>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul className="social-links">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook"></i> Facebook
                </a>
              </li>

              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>

              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>

              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 My Website. All rights reserved.
        </div>
      </footer>
    </Section>
  );
};

export default Footer;
