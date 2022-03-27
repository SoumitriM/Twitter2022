import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userDetailReducer from './reducers/getUserDetailReducer';

const middlewareEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const store = createStore(userDetailReducer, {}, middlewareEnhancer);

export default store;