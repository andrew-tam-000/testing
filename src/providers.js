import _ from 'lodash';
import { createSelector } from 'reselect'

export function getApiKey(key) {
    return state => ({
        [key]: _.get(state, ['general', 'key'])
    })
};

export const relevantRepositorySelector = createSelector(
    state => _.get(state, ['general', 'selectedRepository']),
    state => _.get(state, 'repositories'),
    (selectedRepository, repositories) => _.find(repositories, {id: selectedRepository })
);
export const relevantIssuesSelector = createSelector(
    relevantRepositorySelector,
    state => _.get(state, 'issues'),
    (relevantRepository, issues) => {
        const name = _.get(relevantRepository, 'name');
        const relevantIssues = _.values(_.get(issues, name));
        return relevantIssues;
    }
);
