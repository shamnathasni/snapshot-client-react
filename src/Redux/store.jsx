// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./UserSlice"; 
import vendorReducer from "./VendorSlice"
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);


const Store = configureStore({
  reducer: 
    {
      User:persistedReducer
    },
   
});

const persistor = persistStore(Store);

export { Store, persistor };
