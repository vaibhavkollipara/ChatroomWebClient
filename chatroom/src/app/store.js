import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducers from "./reducers";

const middleware = applyMiddleware(logger,thunkMiddleware);

export default createStore(reducers,middleware);
