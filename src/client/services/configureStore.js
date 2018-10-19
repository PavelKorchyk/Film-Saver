import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import  createSagaMiddleware from 'redux-saga';
import persistCombineReducers from '../redux/reducers/index';
import rootSaga from '../sagas/index';
 
export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  const store = createStore(
    persistCombineReducers, 
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor }
}