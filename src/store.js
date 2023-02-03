import { applyMiddleware, compose, createStore } from 'redux'; 

import combineReducers from './redux/reducers/index.js';
import thunk from 'redux-thunk';

const store = createStore(combineReducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;

