import _ from 'lodash';
import { createSelector } from 'reselect'

export function getApiKey(key) {
    return state => ({
        [key]: _.get(state, ['general', 'key'])
    })
};

export const sortedRepositorySelector = createSelector(
    state => _.get(state, ['general', 'repositorySort']),
    state => _.get(state, 'repositories'),
    ({key, direction}, repositories) => {
        const values = _.values(repositories);
        return _.orderBy(values, [key], [direction]);
    }
);

export const relevantIssuesSelector = createSelector(
    state => _.get(state, ['general', 'selectedRepository']),
    state => _.get(state, 'repositories'),
    state => _.get(state, 'issues'),
    (selectedRepository, repositories, issues) => {
        const name = _.get(repositories, [selectedRepository, 'name']);
        const relevantIssues = _.values(_.get(issues, name));
        return relevantIssues;
    }
);
