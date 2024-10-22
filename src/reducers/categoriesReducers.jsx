// Initialize the state with an empty array to hold category data.
const initialState = [];

// Define the categories reducer function.
// It takes the current state (defaulting to initialState) and an action as arguments.
const categoriesReducers = (state = initialState, action) => {
  // Check if the action type is "SET_CATEGORIES"
  if (action.type === "SET_CATEGORIES") {
    // If it is, return the payload from the action as the new state.
    // This means the categories state will be replaced with the new data.
    return action.payload;
  }
  // If the action type doesn't match, return the current state unchanged.
  return state;
};

// Export the reducer function as the default export of this module.
export default categoriesReducers;
