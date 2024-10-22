import axios from "axios"; // Importing Axios for making HTTP requests

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/Products/"); // Making a GET request to fetch Products
    dispatch({
      type: "SET_PRODUCTS", // Action type to set the fetched Products
      payload: response.data, // The fetched Products data as payload
    });
  } catch (error) {
    console.error("Error in fetching Products ", error); // Logging any errors that occur during the fetch
  }
};
