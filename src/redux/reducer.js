import _ from 'lodash';
import { combineReducers } from 'redux';

export default combineReducers({
    repositories: (state = {}, {payload, type}) => {
        switch(type) {

            case 'RESET_REPOSITORIES':
                return payload;
            default:
                return state;
        }
    },
    issues: (state = {}, {payload, type}) => {
        switch(type) {
            case 'RESTORE_ISSUES':
                return _.assign({}, state, payload);
            case 'REARRANGE_ISSUES':
                const wantedIssues = state[payload.repoName];
                const { oldIndex, newIndex }  = payload;

                if (oldIndex == newIndex) {
                    return state;
                }

                const rearrangedIssues = newIndex > oldIndex ? [
                    ...wantedIssues.slice(0, oldIndex),
                    ...wantedIssues.slice(oldIndex + 1, newIndex + 1),
                    wantedIssues[oldIndex],
                    ...wantedIssues.slice(newIndex + 1)
                ] : [
                    ...wantedIssues.slice(0, newIndex),
                    wantedIssues[oldIndex],
                    ...wantedIssues.slice(newIndex, oldIndex),
                    ...wantedIssues.slice(oldIndex + 1)
                ];

                return _.assign({}, state, { [payload.repoName]: rearrangedIssues});
            case 'UPDATE_ISSUES':
                return _.assign({}, state, { [payload.repoName]: payload.issues});
            default:
                return state;
        }
    },
    general: (state = {}, {payload, type}) => {
        switch(type) {
            case 'UPDATE_KEY':
                return _.assign({}, state, { key: payload });
            case 'CHANGE_REPOSITORY':
                const previousSelectedRepository = _.get(state, 'selectedRepository');
                const selectedRepository = previousSelectedRepository == payload ? '' : payload;
                return _.assign({}, state, { selectedRepository })
            default:
                return state;
        }
    }
});
