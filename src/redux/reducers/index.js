import _ from 'lodash';
import { combineReducers } from 'redux';
import repositories from './repositories';
import issues from './issues';
import general from './general';

export default combineReducers({
    repositories,
    issues,
    general
});
