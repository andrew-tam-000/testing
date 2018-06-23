import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getApiKey } from '../../providers';
import { asyncAddRepositories, updateKey } from '../../redux/actions';

const TextFieldWithKey = connect(
    getApiKey('value'),
    dispatch => ({
        onChange: e => dispatch(updateKey(e.target.value))
    })
)(TextField);

const ButtonToUpdateRepository = connect(
    null,
    (dispatch, props) => ({
        onClick: () => (
            dispatch(asyncAddRepositories())
                .then(
                    () => props.history.push('/dashboard')
                )
        )
    })
)(Button);

class Login extends Component {
    render() {
        return (
            <form>
                <TextFieldWithKey
                    id='name'
                    label='API Key'
                    placeholder='e.g. 1a1f08a198c491c6a1ce8b07ddbbcd4ae3a455d4'
                    margin='normal'
                    fullWidth
                />
                <ButtonToUpdateRepository history={this.props.history} variant='contained' color='primary'>
                    Submit
                </ButtonToUpdateRepository>
            </form>
        )
    }
}

export default Login;
