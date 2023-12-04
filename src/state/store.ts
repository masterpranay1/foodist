import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers';

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
