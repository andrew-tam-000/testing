import { asyncResetRepositories, updateKey, changeRepository, asyncAddIssues, rearrangeIssues } from './actions';

export function resetReposAndMoveToDashboard(key) {
    return (dispatch, props) => ({
        [key]: () => (
            dispatch(asyncResetRepositories())
                .then(
                    () => props.history.push('/dashboard')
                )
        )
    })
}

export function updateApiKey(key) {
    return dispatch => ({
        [key]: e => dispatch(updateKey(e.target.value))
    })
}

export function changeRepositoryAndAddIssues(key) {
    return (dispatch, props) => ({
        [key]: (id, name, owner) => {
            dispatch(changeRepository(id));
            dispatch(asyncAddIssues(name, owner));
        }
    })
}

export function updateIssueOrder(key) {
    return (dispatch, props) => ({
        [key]: ({oldIndex, newIndex}) => dispatch(rearrangeIssues(props.repoName, oldIndex, newIndex))
    })
}

