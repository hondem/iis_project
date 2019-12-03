import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from './reducers';

export default (initialState = {}) => {
	const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  return createStore(rootReducer, initialState, composeEnhancers());
};
