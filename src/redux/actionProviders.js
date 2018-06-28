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
        [key]: () => {
            dispatch(changeRepository(props.id));
            dispatch(asyncAddIssues(props.name, props.owner));
        }
    })
}

export function updateIssueOrder(key) {
    return (dispatch, props) => ({
        [key]: ({oldIndex, newIndex}) => dispatch(rearrangeIssues(props.repoName, oldIndex, newIndex))
    })
}

