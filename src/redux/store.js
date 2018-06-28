import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { restoreIssues } from './actions';
import _ from 'lodash';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cache = store => next => action => {
    const {type, payload} = action;

    const result = next(action);

    if(type == 'REARRANGE_ISSUES' || type == 'UPDATE_ISSUES') {
        const state = store.getState();
        const apiKey = _.get(state, ['general', 'key']);
        const issues = _.get(state, 'issues');

        localStorage.setItem(apiKey, JSON.stringify(issues));
    }
    else if (type == 'RESET_REPOSITORIES') {
        const state = store.getState();
        const apiKey = _.get(state, ['general', 'key']);
        const issues = JSON.parse(localStorage.getItem(apiKey));

        store.dispatch(restoreIssues(issues));
    }

    return result;
}

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
    reducer,
    initialState,
    composeEnhancers(
        applyMiddleware(thunk, cache, logger)
    )
);

export default store;
