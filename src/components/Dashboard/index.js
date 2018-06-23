import _ from 'lodash';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import { sortedRepositorySelector, relevantIssuesSelector } from '../../providers';
import { changeRepository, asyncUpdateIssues } from '../../redux/actions';

const ListItemWithRepoChange = connect(
    null,
    (dispatch, props) => ({
        onClick: () => {
            dispatch(changeRepository(props.id));
            dispatch(asyncUpdateIssues(props.name, props.owner));
        }
    })
)(ListItem);

class Dashboard extends Component {

    componentDidMount() {
        if (!this.props.repositories.length) {
            this.props.history.push('/');
        }
    }

    render() {
        const { repositories, issues } = this.props;

        const gridWidth = issues.length ? 6 : 12;

        return (
            <Grid container>
                <Grid item xs={gridWidth}>
                    <List>
                        {
                            _.map(
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
                            )
                        }
                    </List>
                </Grid>
                {
                    issues.length ? (
                        <List>
                            {
                                _.map(
                                    issues,
                                    issue => {
                                        const { title, updated_at: updatedAt, created_at: createdAt, id } = issue;
                                        return (
                                            <ListItem button key={id}>
                                                <ListItemText primary={title} secondary={createdAt} />
                                            </ListItem>
                                        )
                                    }
                                )
                            }
                        </List>
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
        return {
            issues: relevantIssuesSelector(state),
            repositories: sortedRepositorySelector(state)
        }
    }
)(Dashboard);
