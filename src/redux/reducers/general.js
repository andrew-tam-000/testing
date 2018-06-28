import _ from 'lodash';

export default (state = {}, {payload, type}) => {
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
