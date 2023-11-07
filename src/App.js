import React from "react";
import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Product";
import Cart from "./component/Cart/Cart";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
