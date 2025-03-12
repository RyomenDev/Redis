import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = ({ id }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  return product ? (
    <h2>
      {product.name} - ${product.price}
    </h2>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetails;
