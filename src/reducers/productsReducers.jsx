const initialState = [];

const productsReducers = (state = initialState, action) => {
  if (action.type === "SET_PRODUCTS") {
    return action.payload;
  }
  return state;
};

export default productsReducers;
