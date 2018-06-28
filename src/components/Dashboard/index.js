import _ from 'lodash';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '../List/';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { updateIssueOrder } from '../../actionProviders';
import { sortedRepositorySelector, relevantIssuesSelector, relevantRepositorySelector, repositoryList, issueList } from '../../providers';
import { changeRepository, asyncUpdateIssues, rearrangeIssues } from '../../redux/actions';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

const RepositoryList = connect(repositoryList)(List);

const SortableIssueListWithUpdate = connect(
    issueList,
    null,
    (stateProps, dispatchProps, {repoName, ...ownProps}) => {
        const { dispatch } = dispatchProps;
        const actionProps = updateIssueOrder('onSortEnd')(dispatch, { repoName })
        return _.assign(
            {},
            stateProps,
            ownProps,
            actionProps
        );
    }
)(List);

class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.repositories.length) {
            this.props.history.push('/');
        }
    }

    render() {
        const { repositories, selectedRepository } = this.props;

        const gridWidth = selectedRepository ? 6 : 12;

        const repoName = _.get(selectedRepository, 'name');

        return (
            <Grid container>
                <Grid item xs={gridWidth}>
                    <RepositoryList/>
                </Grid>
                {
                    selectedRepository ? (
                        <Grid item xs={gridWidth}>
                            <SortableIssueListWithUpdate isSortable={true} repoName={repoName}/>
                        </Grid>
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
        const repositories = _.get(state, 'repositories');
        const selectedRepository = relevantRepositorySelector(state);
        return { repositories, selectedRepository }
    }
)(Dashboard);
