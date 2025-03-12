import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [productId]);

  return product ? (
    <div>
      <h2>{product?.name}</h2>
      <p>Price: ${product?.price}</p>
      <p>{product?.description}</p>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default ProductDetails;
