import { persistCombineReducers } from 'redux-persist';
import user from './user';
import { persistConfig } from '../../constants/persistConfig';

export default persistCombineReducers(persistConfig, {
  user,
});