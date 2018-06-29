import React, { Component } from 'react';
import _ from 'lodash';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { resetReposAndMoveToDashboard, updateApiKey } from '../../redux/actionProviders';
import { relevantRepositorySelector } from '../../redux/providers';
import { connect } from 'react-redux';

import Login from '../Login/';
import Dashboard from '../Dashboard/';
const LoginWithSubmit = connect(
    null,
    resetReposAndMoveToDashboard('onSubmit')
)(Login)

const ConnectedDashboard = connect(
    state => {
        const repositories = _.get(state, 'repositories');
        const selectedRepository = relevantRepositorySelector(state);
        return { repositories, selectedRepository }
    }
)(Dashboard);

class App extends Component {

    constructor(props) {
        super(props);
        this.handleChangeKey = this.handleChangeKey.bind(this);
    }

    handleChangeKey() {
        console.log(this);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className='vertical-pane'>
                        <AppBar position='static' color='default'>
                            <Toolbar>
                                <Typography variant='title' className='full-flex'>
                                    Chegg Assignment
                                </Typography>
                                <Link to='/'>
                                    <Button color="inherit">Change API Key</Button>
                                </Link>
                            </Toolbar>
                        </AppBar>
                        <Card className='full-flex'>
                            <CardContent className='full-flex'>
                                <Route exact path='/' component={LoginWithSubmit}/>
                                <Route exact path='/dashboard' component={ConnectedDashboard}/>
                            </CardContent>
                        </Card>
                    </div>
                </Router>
            </Provider>
        );
    }

}

export default App;
