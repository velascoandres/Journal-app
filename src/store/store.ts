import { createStore, combineReducers, compose  } from 'redux';
import { authReducer } from '../reducers/authReducer';


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
    composeEnhancers(),    
);

