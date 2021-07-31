import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducer';

const reduxDevTools = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// check if redux dev tool extension is installed by user and if yes use that
const composeEnhancers = process.env.NODE_ENV === 'development' && reduxDevTools ?
	reduxDevTools : compose;

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
))

export default store;