import _ from 'lodash';

export default (state = {}, {payload, type}) => {
    switch(type) {
        case 'RESTORE_ISSUES':
            return _.assign({}, state, payload);
        case 'REARRANGE_ISSUES':
            const wantedIssues = _.get(state, [payload.repoName, 'order'], []);
            const { oldIndex, newIndex }  = payload;

            if (oldIndex === newIndex) {
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

            const repoWithUpdatedSort = _.assign(
                {},
                _.get(state, payload.repoName),
                { order: rearrangedIssues }
            );

            return _.assign({}, state, { [payload.repoName]: repoWithUpdatedSort });
        case 'ADD_ISSUES':
            const prevById = _.get(state, [payload.repoName, 'byId'], {});
            const prevOrder = _.get(state, [payload.repoName, 'order'], []);

            let newById = {};
            let newOrder = [];

            _.forEach(
                payload.issues,
                issue => {
                    const id = _.get(issue, 'id');
                    if (!_.get(prevById, id)) {
                        newById[id] = issue;
                        newOrder.push(id);
                    }
                }
            );

            const byId = _.assign({}, prevById, newById);
            const order = _.concat(prevOrder, newOrder);

            const updatedRepo = _.assign(
                {},
                _.get(state, payload.repoName),
                { byId, order }
            )

            return _.assign({}, state, { [payload.repoName]: updatedRepo });
        default:
            return state;
    }
}
