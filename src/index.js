import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';

import 'typeface-roboto';
import './index.css';
import Auth from './utility/auth';
import App from './App';
import LoginController from './views/login/LoginController';
import ApplicationsController from './views/applications/ApplicationsController';
import UsersController from './views/users/UsersController';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      Auth.getAccessToken()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
);

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/login" component={LoginController}/>
            <App>
                <Switch>
                    <PrivateRoute exact path="/" component={ApplicationsController} />
                    <PrivateRoute path="/:applicationID" component={UsersController}/>
                </Switch>
            </App>
        </Switch>
    </Router>
    , document.getElementById('root')
);
