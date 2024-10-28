import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
// import AboutPage from "./components/AboutPage";
// import TreatmentsPage from "./components/TreatmentsPage";
// import BlogPage from "./components/BlogPage";
// import ContactPage from "./components/ContactPage";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
                  <Link className="md:p-4 py-3 px-0 block" to="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="md:p-4 py-3 px-0 block" to="/treatments">
                    Treatments
                  </Link>
                </li>
                <li>
                  <Link className="md:p-4 py-3 px-0 block" to="/blog">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    className="md:p-4 py-3 px-0 block md:mb-0 mb-2"
                    to="/contact"
                  >
                    Contact Us
                  </Link>
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
          {/* Add other routes here */}
        </Routes>
      </>
    </Router>
  );
}
