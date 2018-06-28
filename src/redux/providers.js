import _ from 'lodash';
import { createSelector } from 'reselect'
import { connect } from 'react-redux';
import { changeRepositoryAndUpdateIssues } from './actionProviders';
import { SortableContainer, SortableElement, } from 'react-sortable-hoc';

import moment from 'moment';

import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const ListItemWithRepoChange = connect(
    null,
    changeRepositoryAndUpdateIssues('onClick')
)(ListItem);

export function getApiKey(key) {
    return state => ({
        [key]: _.get(state, ['general', 'key'])
    })
};

const SortableIssue = SortableElement( props => <ListItem {...props}/>);

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

export function repositoryList(state) {
    const repositories = _.get(state, 'repositories');
    return {
        items: _.map(
            repositories,
            repo => {
                const { name, id, created_at: createdAt } = repo;
                const owner = _.get(repo, ['owner', 'login']);
                return {
                    content: (
                        <ListItemWithRepoChange button key={id} id={id} owner={owner} name={name}>
                            <ListItemText primary={name} secondary={createdAt} />
                        </ListItemWithRepoChange>
                    ),
                }
            }
        )
    }
}

export function issueList(state) {
    const issues = relevantIssuesSelector(state);

    return {
        items: _.map(
            issues,
            (issue, index) => {

                const { title, updated_at: updatedAt, created_at: createdAt, id } = issue;
                const formatedCreated = moment(createdAt).format('DD/MM/YYYY');
                const formattedUpdated = moment(updatedAt).fromNow();
                const avatars = _.map(
                    _.get(issue, ['assignees']),
                    assignee => _.get(assignee, 'avatar_url')
                );

                return {
                    content: (
                        <SortableIssue button key={id} index={index}>
                            {
                                _.map(
                                    avatars,
                                    avatarUrl => <Avatar key={avatarUrl} src={avatarUrl} />
                                )
                            }
                            <ListItemText primary={title} secondary={formatedCreated} />
                            <ListItemText primary={`Updated ${formattedUpdated}`}/>
                        </SortableIssue>
                    )
                }
            }
        )
    }
}
