import axios from 'axios';
import _ from 'lodash';
import store from '../redux/store';

const root = 'https://api.github.com';
const username = 'andrewtam000';

// Use params for 'get' and data for 'post'
function rootRequest({method, url, data, params}) {
    const state = store.getState();
    const password = _.get(state, ['general', 'key']);

    if (!password) {
        console.error('ERROR: API Token is not set');
    }

    return axios({
        method,
        url: [root, url].join(''),
        data,
        params,
        auth: {
            username,
            password
        }
    });
}

export function getRepositories() {
    return rootRequest({
        url: '/user/repos',
        method: 'GET'
    })
        .then( ({data}) => data)
    ;
}

export function getIssues(repoName, owner) {
    return rootRequest({
        url: `/repos/${owner}/${repoName}/issues`,
        method: 'GET'
    })
        .then( ({data}) => data)
    ;
}
