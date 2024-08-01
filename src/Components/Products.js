import React, { useState, useEffect } from "react";
import "../../src/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    if (currentPage && productsPerPage) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData ? userData.token : null;

      fetch(
        `https://technotes-api.onrender.comapi/products/products?page=${currentPage}&limit=${productsPerPage}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => {
          setProducts(data.products); // Assuming API returns an object with a 'products' property
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [currentPage, productsPerPage]);

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    setEditedProduct(productToEdit);
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;

    if (!token) {
      toast.error("Authentication error. Please login again.");
      return;
    }

    fetch(
      `https://technotes-api.onrender.comapi/products/edit/product/${editedProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        body: JSON.stringify(editedProduct),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        toast.success("Product updated successfully!");
        setProducts(
          products.map((product) =>
            product._id === editedProduct._id ? editedProduct : product
          )
        );
        setEditMode(false);
        setEditedProduct(null);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Error updating product");
      });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedProduct(null);
  };

  const handleDelete = (id) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData ? userData.token : null;

    if (!token) {
      console.error("No token found in local storage");
      toast.error("Authentication error. Please login again.");
      return;
    }

    fetch(`https://technotes-api.onrender.comapi/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        toast.success("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        toast.error("Error deleting product");
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div
      className="products-container"
      style={{ height: "calc(100vh - 135px)", overflowY: "auto" }}
    >
      <ToastContainer />
      <h1 className="products-heading">Products</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Storage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.brand}</td>
              <td>{product.model}</td>
              <td>{product.year}</td>
              <td>{product.color}</td>
              <td>{product.storage} GB</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editMode && (
        <div className="edit-form">
          <h2>Edit Product</h2>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={editedProduct.brand}
            onChange={handleInputChange}
          />
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            value={editedProduct.model}
            onChange={handleInputChange}
          />
          <label htmlFor="year">Year:</label>
          <input
            type="text"
            id="year"
            name="year"
            value={editedProduct.year}
            onChange={handleInputChange}
          />
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={editedProduct.color}
            onChange={handleInputChange}
          />
          <label htmlFor="storage">Storage (GB):</label>
          <input
            type="number"
            id="storage"
            name="storage"
            value={editedProduct.storage}
            onChange={handleInputChange}
          />
          <div className="button-group">
            <button className="save-button" onClick={handleSaveEdit}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Products;
