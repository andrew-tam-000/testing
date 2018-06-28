import { applyMiddleware } from 'redux';
import { restoreIssues } from './actions';
import _ from 'lodash';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const cache = store => next => action => {
    const { type } = action;

    const result = next(action);

    if (type === 'REARRANGE_ISSUES' || type === 'UPDATE_ISSUES') {
        const state = store.getState();
        const apiKey = _.get(state, ['general', 'key']);
        const issues = _.get(state, 'issues');

        localStorage.setItem(apiKey, JSON.stringify(issues));
    }
    else if (type === 'RESET_REPOSITORIES') {
        const state = store.getState();
        const apiKey = _.get(state, ['general', 'key']);
        const issues = JSON.parse(localStorage.getItem(apiKey));

        store.dispatch(restoreIssues(issues));
    }

    return result;
}

export default applyMiddleware(thunk, cache, logger);
