import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductCard } from "./ProductCard";

export const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fecthSearchResults = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8080/api/v1/products/search?q=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results ");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error Fetching Search Results", error);
      }
    };
    fecthSearchResults();
  }, [searchQuery]);

  return (
    <>
      <div>SearchResultsPage</div>
      <div>
        {searchResults.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};
