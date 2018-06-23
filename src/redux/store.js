import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const initialState = {
    repositories: { },
    issues: { },
    general: {
        //key: ''
        key: '1a1f08a198c491c6a1ce8b07ddbbcd4ae3a455d4',
        repositorySort: {
            key: 'created_at',
            direction: 'desc'
        },
        selectedRepository: ''
    }
};

const store = createStore(reducer, initialState, applyMiddleware(thunk, logger));
export default store;
