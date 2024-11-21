import axios from "axios";

export const FETCH_SEARCH_RESULTS_REQUEST = "FETCH_SEARCH_RESULTS_REQUEST";
export const FETCH_SEARCH_RESULTS_SUCCESS = "FETCH_SEARCH_RESULTS_SUCCESS";
export const FETCH_SEARCH_RESULTS_FAILURE = "FETCH_SEARCH_RESULTS_FAILURE";

export const fetchSearchResults = (query) => async (dispatch) => {
  dispatch({ type: FETCH_SEARCH_RESULTS_REQUEST });

  try {
    const response = await axios.get(
      `http://127.0.0.1:8080/api/v1/products/?search=${query}`
    );
    console.log("Search results:", response.data);

    dispatch({
      type: FETCH_SEARCH_RESULTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SEARCH_RESULTS_FAILURE,
      payload: error.message,
    });
  }
};
