// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./UserSlice";
import vendorReducer from "./VendorSlice";
const persistConfig = {
  key: "root",
  storage,
};

const userPersistedReducer = persistReducer(persistConfig, userReducer);
const vendorPersistedReducer = persistReducer(persistConfig, vendorReducer);

const Store = configureStore({
  reducer: {
    User: userPersistedReducer,
    Vendor: vendorPersistedReducer,
  },
});

const persistor = persistStore(Store);

export { Store, persistor };
