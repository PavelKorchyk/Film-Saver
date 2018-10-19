import { all, put, takeEvery } from 'redux-saga/effects';
import * as actionCreators from '../actions';
import history from '../../../services/history';

function* redirectToHome() {
  yield history.replace('/');
}

function* showError() {
  yield put(alert('Login Error!'))
}


export default function* watchRequest() {
  yield all([
    takeEvery(actionCreators.loginSuccess, redirectToHome),
    takeEvery(actionCreators.loginFaild, showError)
  ])
}