import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { resetReposAndMoveToDashboard, updateApiKey } from '../../redux/actionProviders';
import { getApiKey } from '../../redux/providers';

const TextFieldWithApiKey = connect(
    getApiKey('value'),
    updateApiKey('onChange')
)(TextField);

const ButtonToUpdateRepository = connect(
    null,
    resetReposAndMoveToDashboard('onClick')
)(Button);

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(e);
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
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

Login.propTypes = {
    onSubmit: PropTypes.func
};

export default Login;
