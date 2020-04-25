import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from './root-saga';
import rootReducer from './root-reducer';

const sagaMiddleWare = createSagaMiddleWare();

const middleWares = [sagaMiddleWare];

if(process.env.NODE_ENV === 'development') {
    middleWares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
export default { store, persistor}