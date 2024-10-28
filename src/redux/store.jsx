import { combineReducers } from "redux"; // You can import combineReducers from redux toolkit as well
import { configureStore } from "@reduxjs/toolkit"; // Import configureStore
import categoriesReducers from "../reducers/categoriesReducers"; // Import your reducers
import productsReducers from "../reducers/productsReducers"; // Import your reducers

// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  categories: categoriesReducers,
  products: productsReducers, // Corrected typo from produucts to products
});
console.log(rootReducer);
// Create the store with configureStore
const store = configureStore({
  reducer: rootReducer, // Pass the rootReducer here
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Optional, can add custom middleware if needed
});

export default store;
