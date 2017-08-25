import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from "./reducers";

const middleware = applyMiddleware(thunkMiddleware);

export default createStore(reducers,middleware);
