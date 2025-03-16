import axios from "axios"; // Importing Axios for making HTTP requests

export const fetchVendors = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://miniecommbackend.onrender.com/api/v1/vendors/"
    ); // Making a GET request to fetch vendors
    dispatch({
      type: "SET_VENDOR", // Action type to set the fetched Products
      payload: response.data, // The fetched Products data as payload
    });
  } catch (error) {
    console.error("Error in fetching vendors ", error); // Logging any errors that occur during the fetch
  }
};
