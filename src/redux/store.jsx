import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducers from "../reducers/categoriesReducers";
import productsReducers from "../reducers/productsReducers";
import { searchReducer } from "../reducers/searchReducer";
import vendorReducers from "../reducers/vendorReducers";

const rootReducer = combineReducers({
  categories: categoriesReducers,
  products: productsReducers,
  result: searchReducer,
  vendors: vendorReducers,
});
console.log(rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
