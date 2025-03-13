import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          console.log("fetching by id");

          const response = await axios.get(
            `http://localhost:5000/products/${id}`
          );
          console.log(response.data);

          setProduct(response.data);
        } catch (err) {
          setError("Product not found");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      const fetchProducts = async () => {
        try {
          console.log("fetching all product");

          const response = await axios.get("http://localhost:5000/products");
          setProducts(response.data);
        } catch (err) {
          setError("Error fetching products");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [id]);

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        formData
      );
      setProducts([...products, response.data]);
      setFormData({ name: "", price: "", description: "" });
    } catch (err) {
      setError("Error adding product");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  //   console.log({ id });

  return (
    <>
      <div
        style={{
          width: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "40rem",
            margin: "auto",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {id ? (
            <>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {product?.name}
              </h1>
              <p style={{ color: "#4a4a4a" }}>{product?.description}</p>
              <p
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#2563eb",
                }}
              >
                ${product?.price}
              </p>
            </>
          ) : (
            <>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                Add Product
              </h2>
              <form onSubmit={addProduct} style={{ marginBottom: "1rem" }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                  }}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                  }}
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    marginBottom: "0.5rem",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "#2563eb",
                    color: "#fff",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Add Product
                </button>
              </form>

              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  marginTop: "1rem",
                }}
              >
                All Products
              </h2>
              <ul style={{ listStyle: "none", padding: "0" }}>
                {products?.map((prod) => (
                  <li
                    key={prod._id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "0.5rem",
                      marginBottom: "0.5rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onClick={() => navigate(`/products/${prod._id}`)}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.background = "#f3f3f3")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <h3 style={{ fontWeight: "600" }}>{prod.name}</h3>
                    <p>{prod.description}</p>
                    <p style={{ color: "#2563eb" }}>${prod.price}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
