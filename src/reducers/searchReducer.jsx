import {
  FETCH_SEARCH_RESULTS_REQUEST,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_FAILURE,
} from "../redux/actions/searchAction";

const initalState = {
  loading: false,
  results: [],
  error: null,
};

export const searchReducer = (state = initalState, action) => {
  console.log("Action received:", action); // Log action details
  console.log("Previous state:", state);
  switch (action.type) {
    case FETCH_SEARCH_RESULTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return { ...state, loading: false, results: action.payload };
    case FETCH_SEARCH_RESULTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
