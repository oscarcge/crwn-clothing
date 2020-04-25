import { all, call, takeLatest, put} from 'redux-saga/effects';

import UseractionTypes from '../user/user.types';
import { clearCart } from './cart.action';

export function* clearCartOnSignOut() {
    yield put(clearCart());

}


export function* onSingOutSuccess() {
    yield takeLatest(UseractionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
    yield all([ call(onSingOutSuccess) ]);
}