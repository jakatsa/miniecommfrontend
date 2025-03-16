import axios from "axios"; // Importing Axios for making HTTP requests

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://miniecommbackend.onrender.com/api/v1/categories/"
    ); // Making a GET request to fetch categories
    dispatch({
      type: "SET_CATEGORIES", // Action type to set the fetched categories
      payload: response.data, // The fetched categories data as payload
    });
  } catch (error) {
    console.error("Error in fetching categories ", error); // Logging any errors that occur during the fetch
  }
};
