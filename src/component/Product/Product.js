import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const Products = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const [category, setCategory] = useState("");

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(category));
  }, [dispatch, alert, error, category]);

  const clearFilter = () => {
    dispatch(getProduct());
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">
            {products?.length >= 1 ? "Products" : "No products found"}
          </h2>

          <div className="products">
            {products &&
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <br />
            <button onClick={clearFilter}>Clear filters</button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
