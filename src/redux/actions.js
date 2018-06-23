import { getRepositories, getIssues } from '../api/';
import _ from 'lodash';

export function updateKey(key) {
    return {
        type: 'UPDATE_KEY',
        payload: key
    }
}

function addRepositories(repositories) {
    return {
        type: 'ADD_REPOSITORIES',
        payload: repositories
    }
}

function updateIssues(repoName, issues) {
    return {
        type: 'UPDATE_ISSUES',
        payload: { repoName, issues }
    }
}

export function rearrangeIssues(repoName, oldIndex, newIndex) {
    return {
        type: 'REARRANGE_ISSUES',
        payload: { repoName, oldIndex, newIndex }
    }
}

export function changeRepository(id) {
    return {
        type: 'CHANGE_REPOSITORY',
        payload: id
    }
}

export function asyncAddRepositories() {
    return dispatch => {
        return getRepositories()
            .then(
                data => dispatch(addRepositories(data))
            )
    }
}

export function asyncUpdateIssues(repoName, owner) {
    return (dispatch, getState) => {
        const state = getState();
        const repositories = _.get(state, 'repositories');
        const issues = _.get(state, 'issues');
        const relevantIssues = _.get(state, ['issues', repoName]);

        // If we have alrady loaded issues, do nothing
        if (_.size(relevantIssues)) {
            return;
        }

        return getIssues(repoName, owner)
            .then(
                data => dispatch(updateIssues(repoName, data))
            )
        ;
    }
}
