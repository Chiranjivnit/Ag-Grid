import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
//import {watchCount} from './components/sagaWacher/sagaWatcher';
import AgGridReducer from './components/ag-gride-view/AgGridReducer'

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    //AgGridReducer,

})
const store = createStore( rootReducer,applyMiddleware(sagaMiddleware));
//sagaMiddleware.run (watchCount)
ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
