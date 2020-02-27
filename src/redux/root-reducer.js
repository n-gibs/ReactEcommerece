import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer.js';
import cartReducer from './cart/cart.reducer.js';
import directoryReducer from './directory/directory.reducer';
import shopDataReducer from './shop/shop-data.reducer';

const persistConfig = {
  key: 'root',
  storage,
  //only cart since firebase is handling the user
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopDataReducer
});

export default persistReducer(persistConfig, rootReducer);