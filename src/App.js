import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import store from './redux/store';
import { Provider } from 'react-redux';

import Login from './components/Login/';
import Dashboard from './components/Dashboard/';

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
                    <div>
                        <AppBar position='static' color='default'>
                            <Toolbar>
                                <Typography variant='title' style={{flex: 1}}>
                                    Chegg Assignment
                                </Typography>
                                <Link to='/'>
                                    <Button color="inherit">Change API Key</Button>
                                </Link>
                            </Toolbar>
                        </AppBar>
                        <Card>
                            <CardContent>
                                <Route exact path='/' component={Login}/>
                                <Route exact path='/dashboard' component={Dashboard}/>
                            </CardContent>
                        </Card>
                    </div>
                </Router>
            </Provider>
        );
    }

}

export default App;
