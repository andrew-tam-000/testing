import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import _ from 'lodash';
import middleware from './middleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
    repositories: [],
    issues: {},
    general: {
        //key: ''
        key: '1a1f08a198c491c6a1ce8b07ddbbcd4ae3a455d4',
        selectedRepository: ''
    }
};

const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(middleware)
);

export default store;
