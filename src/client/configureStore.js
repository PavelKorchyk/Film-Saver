import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
 
import rootReducer from './redux/reducers/index';
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(
  persistConfig, 
  rootReducer, 
);
 
export default () => {
  let store = createStore(
    persistedReducer, 
    composeWithDevTools(applyMiddleware())
  );
  let persistor = persistStore(store)
  return { store, persistor }
}