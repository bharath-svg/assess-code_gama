import axios from "axios";

import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  //   ADMIN_PRODUCT_REQUEST,
  //   ADMIN_PRODUCT_SUCCESS,
  //   ADMIN_PRODUCT_FAIL,
  //   NEW_PRODUCT_REQUEST,
  //   NEW_PRODUCT_SUCCESS,
  //   NEW_PRODUCT_FAIL,
  //   UPDATE_PRODUCT_REQUEST,
  //   UPDATE_PRODUCT_SUCCESS,
  //   UPDATE_PRODUCT_FAIL,
  //   DELETE_PRODUCT_REQUEST,
  //   DELETE_PRODUCT_SUCCESS,
  //   DELETE_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  // ALL_REVIEW_REQUEST,
  // ALL_REVIEW_SUCCESS,
  //   ALL_REVIEW_FAIL,
  //   DELETE_REVIEW_REQUEST,
  //   DELETE_REVIEW_SUCCESS,
  //   DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

// Get All Products
export const getProduct = (category) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });
    let link = `https://fakestoreapi.com/products`;
    if (category) {
      link = `https://fakestoreapi.com/products/category/${category}`;
    }
    const { data } = await axios.get(link);
    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
