import {configureStore} from '@reduxjs/toolkit';
import loaderReducer from './slices/loader';

export default configureStore({
  reducer: {
    loader: loaderReducer,
  },
});
