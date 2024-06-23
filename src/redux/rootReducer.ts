import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
