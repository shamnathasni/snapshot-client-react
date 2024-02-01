// // store.js
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// const persistConfig = {
//   key: "root",
//   storage,
// };

// const userPersistedReducer = persistReducer(persistConfig, userReducer);
// const vendorPersistedReducer = persistReducer(persistConfig, vendorReducer);

// const Store = configureStore({
//   reducer: {
//     User: userPersistedReducer,
//     Vendor: vendorPersistedReducer,
//   },
// });

// const persistor = persistStore(Store);


// o save the Redux store in Redux Toolkit to local storage in Redux without Persistor, you can use the following steps:
// Install the Redux Toolkit and Redux libraries.
// npm install redux-toolkit redux
// Use code with caution.
// Learn more



// Create a store.
 import { configureStore } from "@reduxjs/toolkit";
 import userReducer from "./UserSlice";
 import vendorReducer from "./VendorSlice";

const store = configureStore({
  reducer: {
    User:  userReducer, 
    Vendor: vendorReducer
  },
  preloadedState: loadStoreFromLocalStorage(),
});


// Create a function to save the store to local storage.
function saveStoreToLocalStorage(store) {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
}
 

// Call the saveStoreToLocalStorage() function when the store changes.
store.subscribe(() => {
  saveStoreToLocalStorage(store);
});


// Create a function to load the store from local storage.
function loadStoreFromLocalStorage() {
  const state = localStorage.getItem('reduxState');
  if (state) {
    return JSON.parse(state);
  }
  return {};
};

export default store;
