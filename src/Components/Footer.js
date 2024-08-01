import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px 0", // Added padding to the bottom
        zIndex: 999, // Ensure the footer is above other content
      }}
    >
      <p>© 2024 Your Company. All rights reserved.</p>
      <p>Contact us: info@yourcompany.com</p>
    </footer>
  );
};

export default Footer;
