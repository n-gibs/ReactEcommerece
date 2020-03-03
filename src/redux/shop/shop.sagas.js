import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'
import ShopActionTypes from './shop.types';

//worker
export function* fetchCollectionsAsync(){

  try{
  const collectionRef = firestore.collection('collections');
  const snapshot = yield collectionRef.get();
  //defer control to saga middleware
  const collectionsMap = yield call (convertCollectionsSnapshotToMap, snapshot);
  yield put(fetchCollectionsSuccess(collectionsMap));
  }catch (error){
    yield (fetchCollectionsFailure(error.message));
  }
};

//pause when a specific action type
//watcher
export function* onFetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START, 
    fetchCollectionsAsync
    );
};