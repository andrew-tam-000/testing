import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getApiKey } from '../../providers';
import { resetReposAndMoveToDashboard, updateApiKey } from '../../actionProviders';

const TextFieldWithApiKey = connect(
    getApiKey('value'),
    updateApiKey('onChange')
)(TextField);

const ButtonToUpdateRepository = connect(
    null,
    resetReposAndMoveToDashboard('onClick')
)(Button);

class Login extends Component {
    render() {
        return (
            <form>
                <TextFieldWithApiKey
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
