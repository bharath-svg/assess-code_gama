import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product.id}`}>
      <img src={product.image} alt={product.title} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;