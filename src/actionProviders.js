import { asyncResetRepositories, updateKey } from './redux/actions';

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
