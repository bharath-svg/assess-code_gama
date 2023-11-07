import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";

import { Rating } from "@material-ui/lab";

import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <img
                className="CarouselImage"
                src={product.image}
                alt={product.title}
              />
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.title}</h2>
                <p>Product # {product.id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    &nbsp;{quantity}&nbsp;
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
