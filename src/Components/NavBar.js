import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const userData = localStorage.getItem("userData");
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userData"));
      const payload = { token };

      const response = await fetch(
        "https://technotes-api.onrender.comapi/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        toast.success("Logout successful!");
        localStorage.clear();
        navigate("/signup");
      } else {
        const data = await response.json();
        if (data && data.error) {
          toast.error(data.error);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <nav
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4B4i6T705dwRSA36lT87HVSoRvhNxzscIVJzyF6nsKkiaM34Adk0llXrI70p9C581t7E&usqp=CAU"
            alt="Logo"
            style={{ height: "40px", marginLeft: "10px" }}
          />
        </div>
        <ul
          style={{
            display: "flex",
            listStyleType: "none",
            padding: 0,
            margin: 0,
            alignItems: "center",
          }}
        >
          {userData ? (
            <>
              <li style={{ marginRight: "10px" }}>
                <Link
                  to="/"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    background: "#555",
                  }}
                >
                  Products
                </Link>
              </li>

              <li style={{ marginRight: "10px" }}>
                <Link
                  to="/add-products"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    background: "#555",
                  }}
                >
                  Add Products
                </Link>
              </li>
              <li style={{ marginRight: "10px" }}>
                <Link
                  to="/update-products"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    background: "#555",
                  }}
                >
                  Update Products
                </Link>
              </li>

              <li style={{ marginRight: "10px" }}>
                <Link
                  to="/profile"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    background: "#555",
                  }}
                >
                  Profile
                </Link>
              </li>
              <li style={{ marginRight: "10px" }}>
                <Link
                  to={"/signup"}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    background: "#555",
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li style={{ marginRight: "10px" }}>
                <Link
                  to="/signup"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    background: "#555",
                  }}
                >
                  Signup
                </Link>
              </li>
              <li style={{ marginRight: "10px" }}>
                <Link
                  to="/login"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    background: "#555",
                  }}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Navbar;
