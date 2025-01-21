const initialState = [];

const vendorReducers = (state = initialState, action) => {
  if (action.type === "SET_VENDOR") {
    return action.payload;
  }
  return state;
};

export default vendorReducers;
