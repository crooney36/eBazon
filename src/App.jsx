import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Profile,
  CreateProduct,
  SingleProductView,
  EditProduct,
  AdminPanel,
  Cart,
  SearchResults,
} from "./pages";
import { Navbar, Footer, Pagination } from "./components";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    const localStorageUsername = localStorage.getItem("username");
    if (localStorageToken && localStorageUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div id="main">
      <div id="navbar-container mb-10">
        <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      </div>

      <div id="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/register"
            element={<Register setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route
            path="/product-view/:productId"
            element={<SingleProductView />}
          />
          <Route path="/:username/profile" element={<Profile />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/panel" element={<AdminPanel />} />
          <Route path="/my-cart" element={<Cart />} />
          <Route
            path="/search-results/:searchInput/:tagInput"
            element={<SearchResults />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
