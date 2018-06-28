import { getRepositories, getIssues } from '../api/';
import _ from 'lodash';

export function updateKey(key) {
    return {
        type: 'UPDATE_KEY',
        payload: key
    }
}

function resetRepositories(repositories) {
    return {
        type: 'RESET_REPOSITORIES',
        payload: repositories
    }
}

function addIssues(repoName, issues) {
    return {
        type: 'ADD_ISSUES',
        payload: { repoName, issues }
    }
}

export function restoreIssues(issues) {
    return {
        type: 'RESTORE_ISSUES',
        payload: issues
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

export function asyncResetRepositories() {
    return dispatch => {
        return getRepositories()
            .then(
                data => dispatch(resetRepositories(data))
            )
    }
}

export function asyncAddIssues(repoName, owner) {
    return dispatch => {
        return getIssues(repoName, owner)
            .then(
                data => dispatch(addIssues(repoName, data))
            )
        ;
    }
}
