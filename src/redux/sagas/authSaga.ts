import { takeLatest, put, call } from 'redux-saga/effects';
import { User } from '../../types';
import firebase from '../../config/firebase'; 
import { signUp, signUpSuccess, signUpFailure, checkAuthStatusSuccess, checkAuthStatusFailure } from '../slices/authSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, loginSuccess, loginFailure } from '../slices/authSlice';

function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    console.log("inside login saga")
    const { email, password } = action.payload;
    const userCredential: firebase.auth.UserCredential = yield call(
      [firebase.auth(), firebase.auth().signInWithEmailAndPassword],
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure('Login failed'));
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}


function* signUpSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    console.log('Sign up saga started');
    const { email, password } = action.payload;
    const userCredential: firebase.auth.UserCredential = yield call(
      [firebase.auth(), firebase.auth().createUserWithEmailAndPassword],
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      console.log('User created:', user);
      yield put(signUpSuccess(user));
    } else {
      console.log('User creation failed');
      yield put(signUpFailure('User creation failed'));
    }
  } catch (error: any) {
    console.error('Error in sign up saga:', error.message);
    yield put(signUpFailure(error.message));
  }
}

function* checkAuthStatusSaga() {
  try {
    const user: User | null = yield call(() => {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          resolve(user);
        });
      });
    });

    if (user) {
      yield put(checkAuthStatusSuccess(user));
    } else {
      yield put(checkAuthStatusSuccess(null));
    }
  } catch (error: any) {
    yield put(checkAuthStatusFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest('auth/signUp', signUpSaga);
  yield takeLatest('auth/checkAuthStatus', checkAuthStatusSaga);
}

export default authSaga;
