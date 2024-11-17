import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import { ProductDetails } from "./components/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/actions/categoriesAction";
import { fetchProducts } from "./redux/actions/productsAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

// import AboutPage from "./components/AboutPage";
// import TreatmentsPage from "./components/TreatmentsPage";
// import BlogPage from "./components/BlogPage";
// import ContactPage from "./components/ContactPage";

export default function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // // Helper function to get product by ID
  // const getProductById = (productId) => {
  //   return products.find((product) => product.id === parseInt(productId));
  // };

  return (
    <Router>
      <>
        {/* navigation bar */}
        <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
          <div className="flex-1 flex justify-between items-center">
            <Link to="/HomePage" className="text-xl">
              Company
            </Link>
          </div>
          <FontAwesomeIcon icon={faCartShopping} />
          {/* <form style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </form> */}

          {/* Hamburger Menu Icon */}
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer md:hidden block"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>

          {/* Toggle the visibility of the menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center md:w-auto w-full`}
            id="menu"
          >
            <nav>
              <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li>
                  <Link className="md:p-4 py-3 px-0 block" to="#">
                    Home
                  </Link>
                </li>
                <li className="relative">
                  <button
                    className="md:p-4 py-3 px-0 block w-full text-left"
                    onClick={toggleDropdown}
                  >
                    Categories
                  </button>

                  {isOpen && (
                    <ul className="absolute bg-white border rounded shadow-lg mt-2 w-48">
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100"
                          to="/category1"
                        >
                          Shoes
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100"
                          to="/category2"
                        >
                          Trending
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100"
                          to="/category3"
                        >
                          Brand New
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link className="md:p-4 py-3 px-0 block" to="#">
                    My Account
                  </Link>
                </li>

                <li>
                  <form style={{ display: "flex", gap: "10px" }}>
                    <input
                      type="text"
                      placeholder="Search..."
                      style={{
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        width: "200px",
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Search
                    </button>
                  </form>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* navigation bar end */}
        <Routes>
          <Route path="/" element={<Navigate to="/HomePage" />} />{" "}
          {/* Redirect from root to HomePage */}
          <Route path="/HomePage" element={<HomePage />} />
          {/* Pass specific product based on productId */}
          <Route
            exact
            path="/products/:productId"
            element={<ProductDetails products={products} />}
          />
          {/* Add other routes here */}
        </Routes>
      </>
    </Router>
  );
}
