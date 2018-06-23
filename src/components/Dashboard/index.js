import _ from 'lodash';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { sortedRepositorySelector, relevantIssuesSelector } from '../../providers';
import { changeRepository, asyncUpdateIssues, rearrangeIssues } from '../../redux/actions';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const ListItemWithRepoChange = connect(
    null,
    (dispatch, props) => ({
        onClick: () => {
            dispatch(changeRepository(props.id));
            dispatch(asyncUpdateIssues(props.name, props.owner));
        }
    })
)(ListItem);

const SortableIssue = SortableElement( props => <ListItem {...props}/>);
const SortableIssueList = SortableContainer( ({repoName, ...props}) => <List {...props}/>);

const SortableIssueListWithUpdate = connect(
    null,
    (dispatch, props) => ({
        onSortEnd: ({oldIndex, newIndex}) => dispatch(rearrangeIssues(props.repoName, oldIndex, newIndex))
    })
)(SortableIssueList);

class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.repositories.length) {
            this.props.history.push('/');
        }
    }

    render() {
        const { repositories, issues, repoName} = this.props;

        const gridWidth = issues.length ? 6 : 12;

        const repositoryRows = _.map(
            repositories,
            repo => {
                const { name, id, created_at: createdAt } = repo;
                const owner = _.get(repo, ['owner', 'login']);
                return (
                    <ListItemWithRepoChange button key={id} id={id} owner={owner} name={name}>
                        <ListItemText primary={name} secondary={createdAt} />
                    </ListItemWithRepoChange>
                )
            }
        );

        const issueRows = _.map(
            issues,
            (issue, index) => {
                const { title, updated_at: updatedAt, created_at: createdAt, id } = issue;
                return (
                    <SortableIssue button key={id} index={index}>
                        <ListItemText primary={title} secondary={createdAt} />
                    </SortableIssue>
                )
            }
        );

        return (
            <Grid container>
                <Grid item xs={gridWidth}>
                    <List>
                        { repositoryRows }
                    </List>
                </Grid>
                {
                    issues.length ? (
                        <SortableIssueListWithUpdate repoName={repoName}>
                            { issueRows }
                        </SortableIssueListWithUpdate>
                    ) : (
                        null
                    )
                }
            </Grid>
        );
    }
}

export default connect(
    state => {
        const selectedRepository = _.get(state, ['general', 'selectedRepository']);
        const repoName = _.get(state, ['repositories', selectedRepository, 'name']);

        return {
            repoName,
            issues: relevantIssuesSelector(state),
            repositories: sortedRepositorySelector(state)
        }
    }
)(Dashboard);
