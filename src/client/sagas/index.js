import { all } from 'redux-saga/effects';
import watchRequest from './watchRequest';
import watchLoginRequest from '../components/Login/sagas/index'

export default function* rootSaga() {
  yield all([
    watchRequest(),
    watchLoginRequest()
  ])
};