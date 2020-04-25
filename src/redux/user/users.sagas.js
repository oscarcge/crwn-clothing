import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { SignInFailure, SignInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from './user.actions';


export function* getSnapShotFromUserAuth(userAuth, aditionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, aditionalData);
        const userSanapShot = yield userRef.get();
        yield put(SignInSuccess({ id: userSanapShot.id, ...userSanapShot.data()  }));

    } catch(error) {
        yield put(SignInFailure(error));
    }
}
export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);

    } catch(error) {
        yield put(SignInFailure(error));
    }
}

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;

        yield getSnapShotFromUserAuth(userAuth);

    } catch(error) {
        yield put(SignInFailure(error));
    }
}

export function* signOut(){
    try {
        yield auth.signOut();
        yield (put(signOutSuccess()))

    } catch(error){
        yield put(signOutFailure(error))
    }
}
export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);


    } catch(error) {
        yield put(SignInFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);

        yield put(signUpSuccess({user,  aditionalData: { displayName } }));

    } catch(error) {
        yield put(signUpFailure(error))
    }
}

export function* sigInAfterSignUp({ payload: {user, aditionalData }}) {
    yield getSnapShotFromUserAuth(user, aditionalData);
}

// USER ACTION CALLS
export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onUserSignedOut(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignupStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, sigInAfterSignUp )  
}

// EXPORT ALL SAGAS CALLS
export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(isUserAuthenticated), 
        call(onUserSignedOut),
        call(onSignupStart),
        call(onSignUpSuccess)
    ]);
}


