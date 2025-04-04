import React, { useEffect, useState, Suspense } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

const HomePage = React.lazy(() => import("./components/HomePage"));
const ProductDetails = React.lazy(() =>
  import("./components/ProductDetails").then((module) => ({
    default: module.ProductDetails,
  }))
);
const SearchResultsPage = React.lazy(() =>
  import("./components/SearchResultsPage")
);
const CategoryProducts = React.lazy(() =>
  import("./components/CategoryProducts")
);
const CategoryPage = React.lazy(() =>
  import("./components/CategoryPage").then((module) => ({
    default: module.CategoryPage,
  }))
);
const CartPage = React.lazy(() =>
  import("./components/CartPage").then((module) => ({
    default: module.CartPage,
  }))
);
const CheckOutPage = React.lazy(() =>
  import("./components/CheckOutPage").then((module) => ({
    default: module.CheckOutPage,
  }))
);
const PayPalPaymentPage = React.lazy(() =>
  import("./components/PayPalPaymentPage")
);
const MpesaPaymentPage = React.lazy(() =>
  import("./components/MpesaPaymentPage")
);
const LoadingPage = React.lazy(() => import("./components/LoadingPage"));

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/actions/categoriesAction";
import { fetchVendors } from "./redux/actions/vendorAction";
import { fetchSearchResults } from "./redux/actions/searchAction";
import { fetchProducts } from "./redux/actions/productsAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
//import { ProductCard } from "./components/ProductCard";
// import AboutPage from "./components/AboutPage";
// import TreatmentsPage from "./components/TreatmentsPage";
// import BlogPage from "./components/BlogPage";
// import ContactPage from "./components/ContactPage";

export default function App() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const vendors = useSelector((state) => state.vendors);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchVendors());
  }, [dispatch]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [cart, setCart] = useState(
    localStorage.getItem("cart") !== null
      ? JSON.parse(localStorage.getItem("cart"))
      : []
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") return;
    dispatch(fetchSearchResults(searchQuery));
    navigate("/search");
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/HomePage" className="text-xl">
            Company
          </Link>
        </div>
        <FontAwesomeIcon icon={faCartShopping} />

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
                <Link className="md:p-4 py-3 px-0 block" to="/CartPage ">
                  Cart({cart.length}) {/*track number of items  */}
                </Link>
              </li>

              <li>
                <form
                  style={{ display: "flex", gap: "10px" }}
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    type="search"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
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
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/HomePage" />} />{" "}
          {/* Redirect from root to HomePage */}
          <Route path="/HomePage" element={<HomePage />} />
          {/* Pass specific product based on productId */}
          <Route
            exact
            path="/products/:productId"
            element={<ProductDetails products={products} vendors={vendors} />}
          />
          <Route
            exact
            path="/search"
            element={
              <SearchResultsPage searchQuery={searchQuery} vendors={vendors} />
            }
          />
          <Route
            exact
            path="/CategoryProducts"
            element={
              <CategoryProducts categories={categories} products={products} />
            }
          />
          <Route exact path="/categories/:slug" element={<CategoryPage />} />
          <Route
            exact
            path="/CartPage"
            element={<CartPage cart={cart} setCart={setCart} />}
          />
          <Route
            exact
            path="/CheckOutPage"
            element={<CheckOutPage cart={cart} setCart={setCart} />}
          />
          <Route exact path="/mpesa-payment" element={<MpesaPaymentPage />} />
          <Route exact path="/paypal-payment" element={<PayPalPaymentPage />} />
        </Routes>
      </Suspense>
    </>
  );
}
