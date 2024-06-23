import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import authSaga from './sagas/authSaga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
