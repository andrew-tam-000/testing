import _ from 'lodash';
import { combineReducers } from 'redux';

export default combineReducers({
    repositories: (state = {}, {payload, type}) => {
        switch(type) {
            case 'ADD_REPOSITORIES':
                const repositories = _.reduce(
                    payload,
                    (agg, repo) => {
                        const id = _.get(repo, 'id');
                        agg[id] = repo;
                        return agg;
                    },
                    {}
                );
                return _.assign({}, state, repositories);
            default:
                return state;
        }
    },
    issues: (state = {}, {payload, type}) => {
        switch(type) {
            case 'UPDATE_ISSUES':
                const { repoName, issues } = payload;
                return _.assign({}, state, { [repoName]: issues});
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
