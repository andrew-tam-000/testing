import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '../List/';
import { connect } from 'react-redux';
import { updateIssueOrder, changeRepositoryAndAddIssues  } from '../../redux/actionProviders';
import { relevantRepositorySelector, repositoryList, issueList } from '../../redux/providers';
import Typography from '@material-ui/core/Typography';

const RepositoryList = connect(repositoryList, changeRepositoryAndAddIssues('handleItemClick'))(List);

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
        const { selectedRepository } = this.props;

        const gridWidth = selectedRepository ? 6 : 12;

        const repoName = _.get(selectedRepository, 'name');

        return (
            <Grid container>
                <Grid className='scrollable' item xs={gridWidth}>
                    <RepositoryList/>
                </Grid>
                {
                    selectedRepository ? (
                        <Grid item xs={gridWidth} className='vertical-pane'>
                            <Typography variant='display1'>{ repoName }</Typography>
                            <SortableIssueListWithUpdate isSortable={true} repoName={repoName} className='scrollable'/>
                        </Grid>
                    ) : (
                        null
                    )
                }
            </Grid>
        );
    }
}

Dashboard.propTypes = {
    repositories: PropTypes.array,
    selectedRepository: PropTypes.string
};

export default Dashboard;
