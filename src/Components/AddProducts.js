import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProducts = () => {
  const [productData, setProductData] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    storage: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "year" || name === "storage") {
      if (!/^\d+$/.test(value)) {
        setError("Year and Storage must be numeric");
        return;
      }
    }
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null);
  };

  const handleAddProducts = async () => {
    try {
      if (!productData.brand) {
        throw new Error("Brand is required");
      }
      if (!productData.model) {
        throw new Error("Model is required");
      }
      if (!productData.year) {
        throw new Error("Year is required");
      }
      if (!productData.color) {
        throw new Error("Color is required");
      }
      if (!productData.storage) {
        throw new Error("Storage is required");
      }
      if (!/^\d+$/.test(productData.year)) {
        throw new Error("Year must be numeric");
      }
      if (!/^\d+$/.test(productData.storage)) {
        throw new Error("Storage must be numeric");
      }

      const { token } = JSON.parse(localStorage.getItem("userData"));
      const { username } = JSON.parse(localStorage.getItem("userData"));
      const products = {
        ...productData,
        userId: username,
      };

      const response = await fetch(
        "https://technotes-api.onrender.comapi/products/add/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(products),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add products");
      }

      toast.success("Products added successfully!");
      setProductData({
        brand: "",
        model: "",
        year: "",
        color: "",
        storage: "",
      });
      setError(null);
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const styles = {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 145px)",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 400,
      margin: "auto",
      padding: 20,
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
      boxShadow: "0px 3px 5px rgba(0,0,0,0.1)",
    },
    form: {
      width: "100%",
      display: "grid",
      gap: 16,
    },
    button: {
      marginTop: 16,
      backgroundColor: "rgb(51, 51, 51)",
      color: "rgb(255, 255, 255)",
    },
    errorMessage: {
      backgroundColor: "#ffcccc",
      color: "#cc0000",
      padding: "8px 12px",
      borderRadius: "4px",
      marginBottom: "10px",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.container}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {error && <div style={styles.errorMessage}>{error}</div>}

        <Typography variant="h5" gutterBottom>
          Add Products
        </Typography>
        <form style={styles.form}>
          <TextField
            label="Brand"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Model"
            name="model"
            value={productData.model}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Year"
            name="year"
            value={productData.year}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Color"
            name="color"
            value={productData.color}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Storage"
            name="storage"
            value={productData.storage}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddProducts}
            style={styles.button}
            fullWidth
          >
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
