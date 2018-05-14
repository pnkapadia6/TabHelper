import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const middlewares = applyMiddleware(thunk);

export default function (initialState) {
  return createStore(rootReducer, initialState, middlewares);
}
