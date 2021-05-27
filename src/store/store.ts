import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk';


const reducers = combineReducers(
  {
    authReducer,
  }
);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  ),
);

