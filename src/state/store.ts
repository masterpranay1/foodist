import { configureStore } from "@reduxjs/toolkit";
import { userReducer, loadingReducer } from './reducers';

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});

export default store;
