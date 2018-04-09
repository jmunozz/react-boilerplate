import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


import logger from '../middlewares/logger';
import reducer from '../reducers';


const middlewares = applyMiddleware(
  logger,
  thunkMiddleware,
);

const store = createStore(reducer, middlewares);

export default store;
