import { ADD_TO_CART, REMOVE_CART_ITEM } from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.id,
      name: data.title,
      price: data.price,
      image: data.image,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
