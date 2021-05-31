import { UIState } from './../reducers/uiReducer';
import { AuthState } from './../reducers/authReducer';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer, NotesState } from '../reducers/notesReducer';

const reducers = combineReducers(
  {
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
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

export interface IStore {
  auth: AuthState,
  ui: UIState,
  notes: NotesState,
}