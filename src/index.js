import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import 'typeface-roboto';
import './index.css';
import App from './App';
import LoginController from './views/login/LoginController';
import ApplicationsController from './views/applications/ApplicationsController';
import UsersController from './views/users/UsersController';

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route exact path="/login" component={LoginController}/>
            <App exact path="/">
                <Switch>
                    <Route exact component={ApplicationsController} />
                    <Route path="/:applicationID" component={UsersController}/>
                </Switch>
            </App>
        </Switch>
    </Router>
    , document.getElementById('root')
);
