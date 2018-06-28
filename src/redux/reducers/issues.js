import _ from 'lodash';

export default (state = {}, {payload, type}) => {
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
        case 'ADD_ISSUES':
            return _.assign({}, state, { [payload.repoName]: payload.issues});
        default:
            return state;
    }
}
