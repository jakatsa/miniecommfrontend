import axios from "axios";

export const FETCH_SEARCH_RESULTS_REQUEST = "FETCH_SEARCH_RESULTS_REQUEST";
{
  /* Action dispatched when the request is initiated.*/
}
export const FETCH_SEARCH_RESULTS_SUCCESS = "FETCH_SEARCH_RESULTS_SUCCESS";
{
  /* Action dispatched when the request is successful.*/
}
export const FETCH_SEARCH_RESULTS_FAILURE = "FETCH_SEARCH_RESULTS_FAILURE";
{
  /* Action dispatched when the request is failed*/
}

export const fetchSearchResults = (query) => async (dispatch) => {
  {
    /**Query is A search string to filter the products. */
  }
  dispatch({ type: FETCH_SEARCH_RESULTS_REQUEST });
  {
    /**informs the redux store that the search has started */
  }

  try {
    const response = await axios.get(
      `https://miniecommbackend.onrender.com/api/v1/products/?search=${query}`
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
