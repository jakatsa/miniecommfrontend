import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResults } from "../redux/actions/searchAction";

const SearchResultsPage = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const {
    results = [],
    loading,
    error,
  } = useSelector((state) => state.result || {});

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchResults(searchQuery));
    }
  }, [dispatch, searchQuery]);

  if (loading) return <p>Loading search results...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Search Results</h1>
      {results.length === 0 ? (
        <p>No results found for "{searchQuery}"</p>
      ) : (
        <div>
          {results.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h2>{item.name}</h2>
              <img
                src={item.images}
                alt={item.name}
                style={{ width: "200px", height: "200px" }}
              />
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <p>Discounted Price: ${item.discount_price}</p>
              <p>Stock: {item.stock}</p>
              <p>Vendor: {item.vendor.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
