import { takeLatest, put, all, call } from 'redux-saga/effects';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.actions'
import UserActionTypes from './user.types';

//signin function
export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess(
      {id: userSnapshot.id, ...userSnapshot.data()})
    );
  }catch(error){
    yield put(signInFailure(error));
  }
}

///////GOOGLE SIGNIN///////
//worker
export function* signInWithGoogle(){
  try{
    //need to access valu returned
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  }catch(error){
    yield put(signInFailure(error));
  }
}

//watcher
export function* onGoogleSignInStart(){
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}


////////////EMAIL SIGNIN////////////
//worker
export function* signInWithEmail({payload: {email, password}}){
  try{
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  }catch(error){
    yield put(signInFailure(error));
  }
}

//watcher
export function* onEmailSignInStart(){
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}


/////////CHECK USER Session//////////
//worker
export function* isUserAuthenticaed(){
  try{
    const userAuth = yield getCurrentUser();
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  }catch(error){
    yield put(signInFailure(error));
  }
}

//watcher
export function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticaed);
}


////////SIGNOUT///////////

//worker
export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}


//watcher
export function* onSignOutStart(){
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}


export function* userSagas(){
  yield all([
    call(onGoogleSignInStart), 
    call(onEmailSignInStart), 
    call(onCheckUserSession), 
    call(onSignOutStart)
  ]);
}